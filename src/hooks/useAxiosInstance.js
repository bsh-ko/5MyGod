import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const REFRESH_URL = "/auth/refresh";

// 로그인 확인 상태를 관리하는 전역 변수
let isLoginPromptShown = false;

function useAxiosInstance() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "final05",
    },
  });

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error("토큰 파싱 오류:", error);
      return true;
    }
  }

  instance.interceptors.request.use((config) => {
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    config.params = {
      delay: 500,
      ...config.params, // 기존 쿼리스트링 복사
    };

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.error("인터셉터", error);
      const { config, response } = error;

      if (config.url === REFRESH_URL) {
        // refresh token 만료
        navigateLogin();
      } else if (user) {
        // 로그인 했으나 access token 만료된 경우
        // refresh 토큰으로 access 토큰 재발급 요청
        const {
          data: { accessToken },
        } = await instance.get(REFRESH_URL, {
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
          },
        });
        setUser({ ...user, accessToken });
        // 갱신된 accessToken으로 재요청
        config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(config);
      } else {
        // 로그인 안한 경우
        navigateLogin();
      }
      return Promise.reject(error);
    }
  );

  function navigateLogin() {
    if (!isLoginPromptShown) {
      isLoginPromptShown = true;
      const gotoLogin = confirm("로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?");
      if (gotoLogin) {
        navigate("/users/login", { state: { from: location.pathname } });
      } else {
        navigate("/", { state: { from: location.pathname } });
      }
      setTimeout(() => {
        isLoginPromptShown = false;
      }, 5000); // 5초 후 재설정
    }
  }

  return instance;
}

export default useAxiosInstance;
