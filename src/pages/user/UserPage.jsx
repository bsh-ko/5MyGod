import React, { useState } from "react";
import Profile from "@pages/user/Profile";
import Tabs from "@pages/user/Tabs";
import ListItem from "@pages/board/ListItem";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("intro");

  const activities = [
    {
      _id: 3,
      seller_id: 2,
      price: 20000,
      show: true,
      active: true,
      name: "SNS 프로필 사진 찍어주세요",
      quantity: 1,
      buyQuantity: 0,
      content: "프로필 사진 바꾸고 싶은데 가볍게 찍어주세요",
      createdAt: "2024.11.23 16:44:33",
      updatedAt: "2024.11.24 18:29:33",
      extra: {
        category: ["PC03"],
        tags: ["TA03"],
        due: "2025.01.02 18:00:00",
      },
    },
    {
      _id: 4,
      seller_id: 2,
      price: 20000,
      show: true,
      active: true,
      name: "티켓팅 대신 해주세요",
      quantity: 1,
      buyQuantity: 0,
      content: "오굿굿 콘서트 꼭 가고 싶은데 티켓팅 대신 해주세요",
      createdAt: "2024.11.23 16:44:33",
      updatedAt: "2024.11.24 18:29:33",
      extra: {
        category: ["PC04"],
        tags: ["TA02", "TA04"],
        due: "2025.01.02 20:00:00",
      },
    },
    {
      _id: 5,
      seller_id: 2,
      price: 20000,
      show: true,
      active: true,
      name: "아이 돌봄 해주세요",
      quantity: 1,
      buyQuantity: 0,
      content: "저희 집 꼬맹이 두 시간만 봐주세요",
      createdAt: "2024.11.23 16:44:33",
      updatedAt: "2024.11.24 18:29:33",
      extra: {
        category: ["PC05"],
        tags: ["TA06", "TA07"],
        due: "2025.01.04 18:00:00",
      },
    },
  ];

  const tabs = [
    { id: "intro", label: "소개" },
    { id: "activity", label: "활동 내역" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* 핸드폰 사이즈 맞춘 레이아웃 */}
      <div className="w-full max-w-[393px] mx-auto h-screen bg-background-color overflow-scroll">
        {/* 헤더 */}
        <header className="flex justify-between items-center px-4 py-3 border-b border-gray-200 font-laundry">
          <h1 className="text-[24px] font-[400] text-gray-black-900">유저 정보</h1>
          <div className="flex">
            <img src="/assets/landline.svg" alt="전화기" />
            <a href="#" className="text-sm text-primary-500 pl-1">
              고객센터
            </a>
          </div>
        </header>

        {/* 프로필 */}
        <Profile nickname="종로구뽀또그래퍼"></Profile>

        {/* 탭 섹션 */}
        <section className="mt-5 font-pretendard">
          <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

          {/* 탭 내용 */}
          {activeTab === "intro" && (
            <div id="intro" className="tab-content">
              <div className="intro bg-white p-5">
                <h3 className="text-lg font-bold mb-3 text-gray-700">자기소개</h3>
                <p>의외로 사진을 또 잘찍어버려</p>
              </div>
              <div className="intro bg-white p-5 my-3">
                <h3 className="text-lg font-bold mb-3 text-gray-700">심부름</h3>
                <ul className="flex space-x-3">
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">편의점 배달</p>
                  </li>
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">음식 배달</p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div id="activity" className="tab-content p-4">
              <ul className="space-y-3">
                {activities.map((activity) => (
                  <ListItem key={activity._id} item={activity} />
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
