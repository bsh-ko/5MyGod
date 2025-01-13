import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [activeItem, setActiveItem] = useState("home");
  const location = useLocation();

  const SCROLL_THRESHOLD = 10;
  const scrollTimeoutRef = React.useRef(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - prevScrollPos);

    // 스크롤 변화량이 임계값보다 큰 경우에만 처리
    if (scrollDifference > SCROLL_THRESHOLD) {
      // 스크롤 방향에 따른 상태 업데이트
      if (currentScrollY < prevScrollPos) {
        // 위로 스크롤
        setVisible(true);
      } else {
        // 아래로 스크롤
        setVisible(false);
      }

      // 이전 스크롤 위치 업데이트
      setPrevScrollPos(currentScrollY);
    }

    // 스크롤 멈춤 감지를 위한 디바운스 처리
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      // 스크롤이 멈추고 일정 시간이 지나면 네비게이션 바를 보이게 함
      setVisible(true);
    }, 150); // 150ms 후에 실행
  }, [prevScrollPos]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 컴포넌트 언마운트 시 클린업
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const handleClick = (id) => {
    setActiveItem(id); // 클릭한 아이템을 활성화 상태로 설정
  };

  if (!visible) {
    return null;
  }

  // 로그인, 회원가입 페이지에서는 네비게이션 바를 숨김
  if (
    location.pathname === "/users/login" ||
    location.pathname === "/users/signup"
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
