import { Link, useNavigate } from "react-router-dom";

export default function HeaderButton() {
  const isLogin = sessionStorage.getItem("user");
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLogin) navigate("/users/login");
  };

  return (
    <div className="flex items-center">
      {isLogin ? (
        <img
          src="/assets/alarm.png"
          className="size-10 cursor-pointer"
          onClick={handleClick}
          alt="알림"
        />
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
