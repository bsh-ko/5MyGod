import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigation } from "../../contexts/NavigationContext";

import homeDefault from "/assets/home-default.png";
import homeActive from "/assets/home-actived.png";
import myerrandsDefault from "/assets/myerrands-default.png";
import myerrandsActive from "/assets/myerrands-actived.png";
import chatingDefault from "/assets/chating-default.png";
import chatingActive from "/assets/chating-actived.png";
import mypageDefault from "/assets/mypage-default.png";
import mypageActive from "/assets/mypage-actived.png";

const navItems = [
  {
    id: "home",
    path: "/",
    patterns: [/^\/$/],
    text: "홈",
    defaultIcon: homeDefault,
    activeIcon: homeActive,
  },
  {
    id: "myerrand",
    path: "/users/myerrand",
    patterns: [/^\/users\/myerrand/],
    text: "진행중심부름",
    defaultIcon: myerrandsDefault,
    activeIcon: myerrandsActive,
  },
  {
    id: "chating",
    path: "/chating",
    patterns: [/^\/chating/],
    text: "채팅",
    defaultIcon: chatingDefault,
    activeIcon: chatingActive,
    gapClass: "gap-y-[2px]",
  },
  {
    id: "mypage",
    path: "/users/mypage",
    patterns: [/^\/users\/mypage/],
    text: "내 정보",
    defaultIcon: mypageDefault,
    activeIcon: mypageActive,
  },
];

export default function NavigationBar() {
  const { visible } = useNavigation();
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (id) => {
    setActiveItem(id); // 클릭한 아이템을 활성화 상태로 설정
  };

  // 로그인, 회원가입 페이지에서는 네비게이션 바를 숨김
  if (
    location.pathname === "/users/login" ||
    location.pathname === "/users/signup" ||
    location.pathname === "/pay/paysuccess"
  ) {
    return null;
  }

  return (
    <nav
      className={`bg-white flex items-center justify-around shadow-card-shadow min-h-[83px] max-w-[393px] mx-auto fixed bottom-0 left-0 right-0 transition-transform duration-100 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ul className="font-laundry text-center text-xs tracking-tight flex justify-between items-center gap-12 mt-3">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              onClick={() => handleClick(item.id)}
              className={`flex flex-col items-center cursor-pointer ${
                activeItem === item.id ? "text-primary-500" : "text-gray-700"
              }`}
            >
              <div
                className={`flex flex-col items-center size-11 ${
                  item.gapClass || "gap-y-[5px]"
                }`}
              >
                <img
                  src={
                    activeItem === item.id ? item.activeIcon : item.defaultIcon
                  }
                  alt={item.text}
                />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.text}
                </span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
