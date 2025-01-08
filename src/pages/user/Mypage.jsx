import React, { useState } from "react";
import Profile from "@pages/user/Profile";
import Tabs from "@pages/user/Tabs";
import ListItem from "@pages/board/ListItem";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("intro");
  // 더미 데이터
  const requests = [
    {
      _id: 1,
      seller_id: 2,
      price: 15000,
      show: true,
      active: true,
      name: "죽과 상비약 부탁",
      quantity: 1,
      buyQuantity: 0,
      content: "죽과 상비약 사다 주세요\n        제발요",
      createdAt: "2024.11.23 16:44:33",
      updatedAt: "2024.11.24 18:29:33",
      extra: {
        category: ["PC01"],
        tags: ["TA01", "TA02"],
        due: "2025.01.03 18:00:00",
        pickupLocation: {
          address: "서울 종로구 세종로 186",
          detailAddress: "광화문역",
          coordinates: {
            latitude: 37.57166213080161,
            longitude: 126.97645483898171,
          },
        },
        arrivalLocation: {
          address: "서울특별시 중구 한강대로 405",
          detailAddress: "서울역 2층 대합실",
          coordinates: {
            latitude: 37.554613947854044,
            longitude: 126.97052998585586,
          },
        },
      },
    },
    {
      _id: 2,
      seller_id: 2,
      price: 30000,
      show: true,
      active: true,
      name: "문서 작성해주세요",
      quantity: 1,
      buyQuantity: 0,
      content: "전문 문서 작성 도와주세요",
      createdAt: "2024.11.23 16:44:33",
      updatedAt: "2024.11.24 18:29:33",
      extra: {
        category: ["PC02"],
        tags: ["TA03", "TA04"],
        due: "2025.01.02 18:00:00",
        pickupLocation: {},
        arrivalLocation: {
          address: "서울특별시 마포구 마포대로 195",
          detailAddress: "마포래미안 1동 1호",
          coordinates: {
            latitude: 37.553491092579186,
            longitude: 126.95314745548572,
          },
        },
      },
    },
  ];

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
    { id: "requests", label: "나의 요청" },
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
          <h1 className="text-[24px] font-[400] text-gray-black-900">나의 정보</h1>
          <div className="flex">
            <img src="/assets/landline.svg" alt="전화기" />
            <a href="#" className="text-sm text-primary-500 pl-1">
              고객센터
            </a>
          </div>
        </header>

        <Profile nickname="내이름마철두브런치" earnings={"34,645,000"} hearts={"999+"} isMyPage={true}></Profile>

        {/* 탭 섹션 */}
        <section className="mt-5 font-pretendard">
          <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

          {/* 탭 내용 */}
          {activeTab === "intro" && (
            <div id="intro" className="tab-content">
              <div className="intro bg-white p-5">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold mb-3 text-gray-700">자기소개</h3>
                  <a href="#" className="text-primary-500 font-bold text-sm">
                    수정하기
                  </a>
                </div>
                <p>의외로 사진을 또 잘찍어버려</p>
              </div>
              <div className="intro bg-white p-5 my-3">
                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">심부름</h3>
                  <a href="#" className="text-primary-500 font-bold text-sm">
                    수정하기
                  </a>
                </div>
                <ul className="flex space-x-3">
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">편의점 배달</p>
                  </li>
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">음식 배달</p>
                  </li>
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">사진 촬영</p>
                  </li>
                </ul>
                <h3 className="text-lg font-bold mt-6 mb-4 text-gray-700">이동 수단</h3>
                <ul className="flex space-x-3">
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">도보</p>
                  </li>
                  <li className="flex items-center">
                    <p className="bg-gray-100 px-2 py-1 rounded-md">대중 교통</p>
                  </li>
                </ul>
                <h3 class="text-lg font-bold mt-6 text-gray-700">심부름 상세 (선택)</h3>
                <p class="text-gray-700 text-sm mb-3">가격이나 자주 하는 질문 또는 안내사항을 작성할 수 있어요</p>
                <select name="" id="" class="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
              </div>
              <div class="intro bg-white p-5 my-3">
                <h3 class="text-lg font-bold text-gray-700 pb-3">경력 (선택)</h3>
                <select name="" id="" class="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
                <h3 class="text-lg font-bold mt-6 text-gray-700 pb-3">자격증 (선택)</h3>
                <select name="" id="" class="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
                <h3 class="text-lg font-bold mt-6 text-gray-700 pb-3">사업자 (선택)</h3>
                <select name="" id="" class="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <div id="requests" className="tab-content p-4">
              <ul className="space-y-3">
                {requests.map((request) => (
                  <ListItem key={request._id} item={request} />
                ))}
              </ul>
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
