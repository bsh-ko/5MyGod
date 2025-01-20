import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

const NotificationBadge = ({ count }) => {
  if (!count) return null;

  return (
    <div className="absolute top-2 right-2 bg-triadic-red-500 rounded-full w-[8px] h-[8px] flex items-center justify-center"></div>
  );
};

export default function HeaderButton() {
  const isLogin = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  // 알림 데이터 가져오기
  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axios.get("/notifications");
      return response.data;
    },
    select: (data) => {
      // 읽지 않은 알림 개수 계산
      return data.item.filter((notification) => !notification.isRead).length;
    },
    refetchInterval: 30000, // 30초 간격으로 갱신
    enabled: !!isLogin, // 로그인 상태에서만 실행
  });

  console.log("읽지 않은 메세지: ", unreadCount);

  const handleClick = () => {
    if (!isLogin) navigate("/users/login");
    else navigate("/users/notifications");
  };

  return (
    <div className="flex items-center">
      {isLogin ? (
        <div className="relative">
          <img
            src="/assets/alarm.png"
            className="size-10 cursor-pointer"
            onClick={handleClick}
            alt="알림"
          />
          <NotificationBadge count={unreadCount} />
        </div>
      ) : (
        <Link
          to={"/users/login"}
          state={{ title: "로그인" }}
          className="font-laundry text-primary-500 text-toggle-text font-bold cursor-pointer"
        >
          시작하기
        </Link>
      )}
    </div>
  );
}
