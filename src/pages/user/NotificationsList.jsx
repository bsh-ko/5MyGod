import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationProvider";
import NotificationItem from "./NotificationItem";
import NotificationCreate from "@components/NotificationCreate";
// import useAxiosInstance from "@hooks/useAxiosInstance";

export default function NotificationsList() {
  const location = useLocation();
  const { notifications } = useNotification();

  if (!notifications.length)
    return (
      <div>
        <div>알림이 없습니다</div>{" "}
        {/* <NotificationCreate
          type="apply"
          targetId="1"
          errandId="2"
          errandTitle="텍스트"
        /> */}
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

        {/* <NotificationCreate
          type="apply"
          targetId="1"
          errandId="2"
          errandTitle="텍스트"
        /> */}
      </main>
    </div>
  );
}
