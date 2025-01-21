import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

// 알림 데이터 context
const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const isLogin = sessionStorage.getItem("user");

  // 알림 생성하는 함수
  const createNotification = useMutation({
    mutationFn: async (notificationData) => {
      try {
        const response = await axios.post("/notifications", notificationData); // 알림 데이터 추가
        return response.data;
      } catch (error) {
        console.error("알림 생성 에러:", error.response?.data || error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("알림 생성 실패:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // 알림 목록 불러오기
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axios.get("/notifications");
      console.log("알림 기능 동작중", response);
      return response.data;
    },
    refetchInterval: 10000,
    enabled: !!isLogin,
  });

  // 읽지 않은 알림 갯수
  const unreadCount =
    data?.item?.filter((notification) => !notification.isRead).length || 0;

  // 전체 읽음 처리
  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const response = await axios.patch("/notifications/read");
      console.log("전체 읽음 처리됨", response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // Context
  const value = {
    notifications: data?.item || [],
    unreadCount,
    createNotification: createNotification.mutate,
    markAllAsRead: markAllAsRead.mutate,
  };

  // Provider
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// 알림 생성하는 함수 다루기
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
