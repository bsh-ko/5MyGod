import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "final05",
    },
  });

  // 요청 인터셉터

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
