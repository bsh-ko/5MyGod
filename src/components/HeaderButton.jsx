import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationProvider";
import useUserStore from "@zustand/userStore";

const NotificationBadge = ({ count }) => {
  if (!count) return null;

  return (
    <div className="absolute top-2 right-2 bg-triadic-red-500 rounded-full w-[8px] h-[8px] flex items-center justify-center"></div>
  );
};

export default function HeaderButton() {
  const isLoggedOut = useUserStore((state) => state.user === null);
  const navigate = useNavigate();
  const { unreadCount } = useNotification();

  const handleClick = () => {
    if (isLoggedOut) navigate("/users/login");
  };

  return (
    <div className="flex items-center">
      {!isLoggedOut ? (
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
