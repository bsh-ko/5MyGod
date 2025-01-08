import { useLocation, useNavigate } from "react-router-dom";
import HeaderButton from "@components/HeaderButton";

export default function NavigationHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageConfig = () => {
    switch (location.pathname) {
      case "/":
        return {
          title: "오는길에",
          showBackButton: false,
          showHeaderButton: true,
          bgColor: "bg-background-color",
        };
      case "/users/signup":
        return {
          title: "회원가입",
          showBackButton: false,
          showHeaderButton: false,
          bgColor: "bg-white",
        };
      case "/users/mypage":
        return {
          title: "나의 정보",
          showBackButton: false,
          showHeaderButton: false,
          bgColor: "bg-background-color",
        };
      default:
        return {
          title: "오는길에",
          showBackButton: true,
          showHeaderButton: true,
          bgColor: "bg-background-color",
        };
    }
  };

  const config = getPageConfig();

  const handleBack = () => {
    navigate(-1);
  };

  const getTitleStyle = (title) => {
    if (title === "오는길에") {
      return "font-laundry font-bold text-primary-500 text-[28px]";
    }
    return "font-laundry text-[20px] text-gray-900";
  };
  const commonHeaderStyle =
    "w-full min-h-[49px] flex justify-between items-center tracking-tighter sticky top-0";
  const backButtonStyle = "p-2 hover:bg-gray-50 rounded-full transition-colors";

  return (
    <nav className={`${commonHeaderStyle} ${config.bgColor}`}>
      <div className="flex items-center mx-4">
        {config.showBackButton && (
          <button onClick={handleBack} className={backButtonStyle}>
            <img src="../../assets/back-icon.svg" className="hidden" />
          </button>
        )}
        <h1 className={getTitleStyle(config.title)}>{config.title}</h1>
      </div>

      <div className="gap-x-1 mx-4 flex items-center">
        {config.showHeaderButton && <HeaderButton />}
      </div>
    </nav>
  );
}
