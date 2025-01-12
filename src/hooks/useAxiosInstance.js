import useUserStore from "@zustand/userStore";
import axios from "axios";

const REFRESH_URL = "/auth/refresh";
function useAxiosInstance() {
  const { user, setUser } = useUserStore();
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "final05",
    },
  });

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
    (error) => {
      console.error("response interceptor: ", error);
      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
