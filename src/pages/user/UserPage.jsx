import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";

import Profile from "@pages/user/Profile";
import Tabs from "@pages/user/Tabs";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("intro");
  const { user } = useUserStore();
  const axios = useAxiosInstance();
  const { _id } = useParams();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", _id], // Query Key
    queryFn: () => axios.get(`/users/${_id}`),
    select: (res) => res.data,
  });
  console.log("User ID : ", users);

  if (isLoading) return <div>로딩 중...</div>;

  if (error) {
    const errorMessage = error.response?.data?.message || "유저 정보를 가져오는 데 실패했습니다.";
    return <div>{errorMessage}</div>;
  }

  const tabs = [
    { id: "intro", label: "소개" },
    // 필요한 경우 다른 탭을 추가할 수 있습니다.
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* 핸드폰 사이즈 맞춘 레이아웃 */}
      <div className="w-full max-w-[393px] mx-auto h-screen bg-background-color overflow-scroll">
        <Profile nickname={users.item.name || "닉네임 없음"} hearts={users.item.extra.likes || "0"} isMyPage={false} />

        {/* 탭 섹션 */}
        <section className="mt-5 font-pretendard">
          {/* <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} /> */}

          {/* 탭 내용 */}
          {activeTab === "intro" && (
            <div id="intro" className="tab-content">
              <div className="intro bg-white p-5">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold mb-3 text-gray-700">자기소개</h3>
                </div>
                <p>{users.item.extra.introduction || "자기소개 내용이 없습니다."}</p>
              </div>
              <div className="intro bg-white p-5 my-3">
                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">심부름</h3>
                </div>
                <ul className="flex space-x-3">
                  {users.item.extra.errands?.map((task, index) => (
                    <li key={index} className="flex items-center">
                      <p className="bg-gray-100 px-2 py-1 rounded-md">{task}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">이동 수단</h3>
                </div>
                <ul className="flex space-x-3">
                  {users.item.extra.transportation?.map((transport, index) => (
                    <li key={index} className="flex items-center">
                      <p className="bg-gray-100 px-2 py-1 rounded-md">{transport}</p>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold mt-6 text-gray-700">심부름 상세</h3>
                <p className="w-full h-14 bg-gray-100 rounded-[10px] px-4 leading-[56px]">{users.item.extra.details}</p>
              </div>
              <div className="intro bg-white p-5 my-3">
                <h3 className="text-lg font-bold text-gray-700 pb-3">경력</h3>
                <p className="w-full h-14 bg-gray-100 rounded-[10px] px-4 leading-[56px]">
                  {users.item.extra.experience}
                </p>
                <h3 className="text-lg font-bold mt-6 text-gray-700 pb-3">자격증</h3>
                <p className="w-full h-14 bg-gray-100 rounded-[10px] px-4 leading-[56px]">
                  {users.item.extra.certificates}
                </p>
                <h3 className="text-lg font-bold mt-6 text-gray-700 pb-3">사업자</h3>
                <p className="w-full h-14 bg-gray-100 rounded-[10px] px-4 leading-[56px]">
                  {users.item.extra.business}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
