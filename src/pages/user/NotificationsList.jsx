import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import NotificationItem from "./NotificationItem";
import NotificationCreate from "./NotificationCreate";

export default function NotificationsList() {
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axios.get("/notifications");
      return response;
    },
    select: (res) => res.data,
  });
  console.log("알람 목록 ", data);

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
