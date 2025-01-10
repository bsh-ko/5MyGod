import { useLocation, useNavigate, matchPath } from "react-router-dom";
import HeaderButton from "@components/HeaderButton";

export default function NavigationHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageConfig = () => {
    // 기존 방식: 패턴 정의
    // if (location.pathname.match(/^\/products\/[^/]+$/)) {
    //   return {
    //     title: "심부름 상세",
    //     showBackButton: true,
    //     showHeaderButton: false,
    //     bgColor: "bg-background-color",
    //   };
    // }

    // 네비게이션 바의 최상단 뎁스에선 BackButton을 숨겨야하므로 개별 처리
    switch (location.pathname) {
      case "/":
        return {
          title: "오는길에",
          showBackButton: false,
          showHeaderButton: true,
          bgColor: "bg-background-color",
        };
      case "/users/mypage":
        return {
          title: "나의 정보",
          showBackButton: false,
          showHeaderButton: false,
          bgColor: "bg-background-color",
        };
      default:
        // 업데이트된 방식
        return {
          title: location.state.title,
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
      return "font-laundry align-baseline flex font-bold text-primary-500 text-[28px]";
    }
    return "font-laundry align-baseline grid place-items-center text-[20px] text-gray-900";
  };
  const commonHeaderStyle =
    "w-full min-h-[49px] flex justify-between items-center tracking-tighter sticky top-0";

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${commonHeaderStyle} ${config.bgColor} h-14 border-b border-gray-100 flex items-center max-w-[393px] mx-auto z-50`}
    >
      <div className="flex items-center justify-between w-full px-4">
        {/* 왼쪽: 타이틀 또는 앱 이름 */}
        <div className="flex items-center">
          {config.showBackButton && (
            <button onClick={handleBack}>
              <img src="/assets/back-icon.png" />
            </button>
          )}
          <h1 className={`${getTitleStyle(config.title)}`}>{config.title}</h1>
        </div>

        {/* 오른쪽: 위치 버튼 (메인 페이지일 때만) */}
        {config.showHeaderButton && (
          <div className="flex items-center text-sm text-gray-600">
            {config.showHeaderButton && <HeaderButton />}
          </div>
        )}
      </div>
    </header>
  );
}
