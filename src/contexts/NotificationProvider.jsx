import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const isLogin = sessionStorage.getItem("user");

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

  const unreadCount =
    data?.item?.filter((notification) => !notification.isRead).length || 0;

  const createNotification = useMutation({
    mutationFn: async (notificationData) => {
      const response = await axios.post("/notifications", notificationData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const response = await axios.patch("/notifications/read");
      console.log("읽음 처리됨", response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const value = {
    notifications: data?.item || [],
    unreadCount,
    createNotification: createNotification.mutate,
    markAllAsRead: markAllAsRead.mutate,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
