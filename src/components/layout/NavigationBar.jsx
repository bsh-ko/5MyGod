import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import homeDefault from "/assets/home-default.png";
import homeActive from "/assets/home-actived.png";
import myerrandsDefault from "/assets/myerrands-default.png";
import myerrandsActive from "/assets/myerrands-actived.png";
import chatingDefault from "/assets/chating-default.png";
import chatingActive from "/assets/chating-actived.png";
import myinfoDefault from "/assets/myinfo-default.png";
import myinfoActive from "/assets/myinfo-actived.png";

const navItems = [
  {
    path: "/",
    text: "홈",
    defaultIcon: homeDefault,
    activeIcon: homeActive,
  },
  {
    // 다른 페이지 완성되는대로 추후 경로 수정 예정
    path: "/users/signup",
    text: "내 심부름",
    defaultIcon: myerrandsDefault,
    activeIcon: myerrandsActive,
  },
  {
    path: "/chat",
    text: "채팅",
    defaultIcon: chatingDefault,
    activeIcon: chatingActive,
    gapClass: "gap-y-[2px]",
  },
  {
    path: "/users/mypage",
    text: "내 정보",
    defaultIcon: myinfoDefault,
    activeIcon: myinfoActive,
  },
];

export default function NavigationBar() {
  const [visible, setVisible] = useState(true); // 네비게이션 바 표시 상태를 관리하는 state
  const [prevScrollPos, setPrevScrollPos] = useState(0); // 마지막 스크롤 위치를 저장하는 state

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // 스크롤 방향 감지
      const isScrollingDown = currentScrollPos > prevScrollPos;

      // 스크롤 위치가 30px 미만일 때는 항상 표시
      if (currentScrollPos < 30) {
        setVisible(true);
      } else {
        setVisible(!isScrollingDown);
      }

      // 마지막 스크롤 위치 업데이트
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]); // prevScrollPos가 변경될때마다 useEffect 실행

  return (
    <nav
      className={`bg-white flex items-center justify-around shadow-card-shadow min-h-[83px] max-w-[393px] mx-auto fixed bottom-0 left-0 right-0 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ul className="font-laundry text-center text-xs tracking-tight flex justify-between items-center gap-12 mt-3">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              title={item.text}
              className={({ isActive }) =>
                `flex flex-col items-center text-gray-700 ${
                  isActive ? "text-primary-500" : ""
                }`
              }
            >
              {({ isActive }) => (
                <div
                  className={`flex flex-col items-center size-11 ${
                    item.gapClass || "gap-y-[5px]"
                  }`}
                >
                  <img
                    src={isActive ? item.activeIcon : item.defaultIcon}
                    alt={item.text}
                  />
                  <span>{item.text}</span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
