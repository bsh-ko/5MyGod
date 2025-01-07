import React from "react";
import ListItem from "@pages/board/ListItem";

// 임시 헤더
const Header = () => (
  <header className="font-laundry shadow-inset shadow-gray-500 h-[50px] flex items-center justify-center flex-shrink-0">
    내심부름
  </header>
);

// 탭 메뉴
const TabMenu = () => (
  <div className="px-4 py-2">
    <nav className="max-w-full bg-gray-100 border border-gray-200 rounded-lg p-2">
      <div className="flex justify-between items-center gap-2">
        <button className="font-laundry w-1/2 text-center py-2 rounded-lg font-medium bg-white shadow-md">
          지원한 심부름
        </button>
        <button className="font-laundry w-1/2 text-center py-2 text-gray-500">
          부탁한 심부름
        </button>
      </div>
    </nav>
  </div>
);

// 매칭 탭
const MatchingTab = () => (
  <div className="px-4 py-2">
    <nav className="max-w-full bg-gray-100 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center gap-2">
        <button className="font-laundry w-1/2 text-center py-2 rounded-lg font-medium bg-white shadow-md">
          매칭 전이에요
        </button>
        <button className="font-laundry w-1/2 text-center py-2 text-gray-500">
          매칭 되었어요
        </button>
      </div>
    </nav>
  </div>
);

// 메인 콘텐츠
const MainContent = () => (
  <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-scroll">
    <TabMenu />
    <MatchingTab />
    <ul className="list flex flex-col items-center gap-[24px]">
      {sampleItems.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </ul>
  </main>
);

// 푸터
const Footer = () => (
  <footer className="font-laundry shadow-inset shadow-gray-500 h-[83px] flex items-center justify-center flex-shrink-0">
    내비게이션 바
  </footer>
);

// 메인 레이아웃
const MyErrand = () => (
  <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

export default MyErrand;
