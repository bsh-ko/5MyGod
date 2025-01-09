import React, { useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";

import Profile from "@pages/user/Profile";
import Tabs from "@pages/user/Tabs";
import ListItem from "@pages/board/ListItem";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("intro");
  const { user } = useUserStore(); // zustand로 사용자 정보 가져오기
  const axios = useAxiosInstance();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"], // Query Key
    queryFn: () => axios.get(`/users/${user._id}`).then((res) => res.data),
  });

  console.log(users);

  // 로딩 상태
  if (isLoading) return <div>로딩 중...</div>;

  // 에러 상태
  if (error) {
    const errorMessage = error.response?.data?.message || "유저 정보를 가져오는 데 실패했습니다.";
    return <div>{errorMessage}</div>;
  }
  const tabs = [
    { id: "intro", label: "소개" },
    { id: "requests", label: "나의 요청" },
    { id: "apply", label: "나의 지원" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* 핸드폰 사이즈 맞춘 레이아웃 */}
      <div className="w-full max-w-[393px] mx-auto h-screen bg-background-color overflow-scroll">
        <Profile
          nickname={users.item.name || "닉네임 없음"}
          earnings={users.item.extra.earnings || "0"}
          hearts={users.item.extra.likes || "0"}
          isMyPage={true}
        />

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
                <p>{users.item.extra.introduction}</p>
              </div>
              <div className="intro bg-white p-5 my-3">
                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">심부름</h3>
                  <a href="#" className="text-primary-500 font-bold text-sm">
                    수정하기
                  </a>
                </div>
                {users.item.extra.errands ? (
                  <ul className="flex space-x-3">
                    {users.item.extra.errands.map((task, index) => (
                      <li key={index} className="flex items-center">
                        <p className="bg-gray-100 px-2 py-1 rounded-md">{task}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>선호하는 심부름을 설정해보세요.</p>
                )}
                <h3 className="text-lg font-bold mt-6 mb-4 text-gray-700">이동 수단</h3>
                {users.item.extra.transportation ? (
                  <ul className="flex space-x-3">
                    {users.item.extra.transportation.map((transportation, index) => (
                      <li key={index} className="flex items-center">
                        <p className="bg-gray-100 px-2 py-1 rounded-md">{transportation}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>이동수단을 설정해보세요.</p>
                )}
                <h3 className="text-lg font-bold mt-6 text-gray-700">심부름 상세 (선택)</h3>
                <p className="text-gray-700 text-sm mb-3">가격이나 자주 하는 질문 또는 안내사항을 작성할 수 있어요</p>
                <select name="" id="" className="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
              </div>
              <div className="intro bg-white p-5 my-3">
                <h3 className="text-lg font-bold text-gray-700 pb-3">경력 (선택)</h3>
                <select name="" id="" className="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
                <h3 className="text-lg font-bold mt-6 text-gray-700 pb-3">자격증 (선택)</h3>
                <select name="" id="" className="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
                <h3 className="text-lg font-bold mt-6 text-gray-700 pb-3">사업자 (선택)</h3>
                <select name="" id="" className="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <div id="requests" className="tab-content p-4">
              <ul className="space-y-3">
                {/* {requests.map((request) => (
                  <ListItem key={request._id} item={request} />
                ))} */}
              </ul>
            </div>
          )}

          {activeTab === "apply" && (
            <div id="apply" className="tab-content p-4">
              <ul className="space-y-3">
                {/* {apply.map((apply) => (
                  <ListItem key={apply._id} item={apply} />
                ))} */}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
