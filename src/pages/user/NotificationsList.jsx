import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import NotificationItem from "./NotificationItem";
import NotificationCreate from "./NotificationCreate";

export default function NotificationsList() {
  const axios = useAxiosInstance();
  const location = useLocation();
  const queryClient = useQueryClient();

  // 읽음 처리 mutation
  const markAsRead = useMutation({
    mutationFn: async () => {
      const response = await axios.patch("/notifications/read");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axios.get("/notifications");
      return response;
    },
    select: (res) => res.data,
  });
  console.log("알람 목록 ", data);

  // 페이지를 벗어날 때 읽음 처리
  useEffect(() => {
    // 현재 페이지가 알림 페이지일 때만 확인(markAsRead) 함수 실행
    return () => {
      if (location.pathname === "/users/notification") {
        markAsRead.mutate();
      }
    };
  }, [location]);

  if (!data) return <div>알림이 없습니다</div>;

  const sortedNotifications = [...data.item].sort(
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
