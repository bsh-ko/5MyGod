import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
    patterns: [/^\/products/, /^\/$/],
    text: "홈",
    defaultIcon: homeDefault,
    activeIcon: homeActive,
  },
  {
    // 다른 페이지 완성되는대로 추후 경로 수정 예정
    path: "/user/myerrands",
    patterns: [/^\/user\/myerrands/],
    text: "내 심부름",
    defaultIcon: myerrandsDefault,
    activeIcon: myerrandsActive,
  },
  {
    path: "/chat",
    patterns: [/^\/chat/],
    text: "채팅",
    defaultIcon: chatingDefault,
    activeIcon: chatingActive,
    gapClass: "gap-y-[2px]",
  },
  {
    path: "/users/mypage",
    patterns: [/^\/users\/mypage/],
    text: "내 정보",
    defaultIcon: myinfoDefault,
    activeIcon: myinfoActive,
  },
];

export default function NavigationBar() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // 스크롤 방향에 따른 즉각적인 상태 업데이트
    if (currentScrollY < prevScrollPos) {
      setVisible(true);
    } else if (currentScrollY > prevScrollPos) {
      setVisible(false);
    }
    setPrevScrollPos(currentScrollY);
  }, [prevScrollPos]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 컴포넌트 언마운트 시 클린업
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // handleScroll을 의존성 배열에 추가

  const isPathActive = (patterns) => {
    return patterns.some((pattern) => pattern.test(location.pathname));
  };

  if (!visible) {
    return null;
  }

  // 로그인 페이지에서는 버튼을 숨김
  if (location.pathname === "/users/login") {
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
              title={item.text}
              state={{ title: item.text }}
              className={`flex flex-col items-center cursor-pointer ${
                isPathActive(item.patterns)
                  ? "text-primary-500"
                  : "text-gray-700"
              }`}
            >
              <div
                className={`flex flex-col items-center size-11 ${
                  item.gapClass || "gap-y-[5px]"
                }`}
              >
                <img
                  src={
                    isPathActive(item.patterns)
                      ? item.activeIcon
                      : item.defaultIcon
                  }
                  alt={item.text}
                />
                <span>{item.text}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
