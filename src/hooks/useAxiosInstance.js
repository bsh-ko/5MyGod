import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const REFRESH_URL = "/auth/refresh";
function useAxiosInstance() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "final05",
    },
  });

  // 중복 알림 방지용 변수
  let isAlertShown = false;

  // 요청 인터셉터
  instance.interceptors.request.use((config) => {
    // refresh 요청일 경우 Authorization 헤더는 이미 refresh token으로 지정되어 있음
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    config.params = {
      delay: 500,
      ...config.params, // 기존 쿼리스트링 복사
    };
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    // 에러 처리
    async (error) => {
      console.error("response interceptor: ", error);
      const { config, response } = error;

      if (response?.status === 401) {
        if (isAlertShown) return Promise.reject(error);
        isAlertShown = true;
        // 인증 실패
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
          navigateLogin();
        }
      }

      return Promise.reject(error);
    }
  );

  function navigateLogin() {
    const gotoLogin = confirm("로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?");
    if (gotoLogin) {
      navigate("/users/login", { state: { from: location.pathname } });
    }
  }

  return instance;
}

export default useAxiosInstance;
