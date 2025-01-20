import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationProvider";
import NotificationItem from "./NotificationItem";
import NotificationCreate from "@components/NotificationCreate";
// import useAxiosInstance from "@hooks/useAxiosInstance";

export default function NotificationsList() {
  const location = useLocation();
  const { notifications, markAllAsRead } = useNotification();

  useEffect(() => {
    return () => {
      // 페이지를 벗어날 때 읽음 처리
      if (location.pathname === "/users/notifications") {
        markAllAsRead(); // Context에서 제공된 markAllAsRead 호출
      }
    };
  }, [location.pathname, markAllAsRead]);

  // const axios = useAxiosInstance();
  // const queryClient = useQueryClient();

  // 읽음 처리 mutation
  //   const markAsRead = useMutation({
  //     mutationFn: async () => {
  //       const response = await axios.patch("/notifications/read");
  //       return response.data;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["notifications"]);
  //     },
  //   });

  //   const { data } = useQuery({
  //     queryKey: ["notifications"],
  //     queryFn: async () => {
  //       const response = await axios.get("/notifications");
  //       return response;
  //     },
  //     select: (res) => res.data,
  //   });
  //   console.log("알람 목록 ", data);

  //   useEffect(() => {
  //     return () => {
  //       if (location.pathname === "/users/notification") {
  //         markAsRead();
  //       }
  //     };
  //   }, [location, markAsRead]);

  if (!notifications.length)
    return (
      <div>
        <div>알림이 없습니다</div> <NotificationCreate />
      </div>
    );

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="l_container max-w-[393px] h-screen flex flex-col">
      <main className="bg-background-color flex-grow flex flex-col relative">
        <ul>
          {sortedNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </ul>

        <NotificationCreate />
      </main>
    </div>
  );
}
