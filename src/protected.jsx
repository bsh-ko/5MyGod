import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@zustand/userStore";

function Protected() {
  const { user } = useUserStore();
  const [isLoginPromptShown, setIsLoginPromptShown] = useState(false);

  useEffect(() => {
    setIsLoginPromptShown(false);
  }, [user]);

  if (!user) {
    if (!isLoginPromptShown) {
      setIsLoginPromptShown = true;
      const gotoLogin = window.confirm("로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?");
      if (gotoLogin) {
        window.location.href = "/users/login";
      } else {
        window.location.href = "/";
      }
    }
    return null;
  }

  return <Outlet />;
}

export default Protected;
