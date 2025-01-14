import React, { useState, useEffect } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useUserStore from "@zustand/userStore";
import { useParams } from "react-router-dom";

import Profile from "@pages/user/Profile";
import Tabs from "@pages/user/Tabs";
import MyRequests from "@pages/user/MyRequests";
import MyApplies from "@pages/user/MyApplies";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("intro"); //탭 전환
  const { user } = useUserStore();
  const { _id } = useParams();
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  // const updateProfile = async;
  const [isEditing, setIsEditing] = useState(false); // 수정

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"], // Query Key
    queryFn: () => axios.get(`/users/${user._id}`).then((res) => res.data),
  });
  console.log("유저 정보 : ", users);

  // 나의 요청탭
  const { data: requestData } = useQuery({
    queryKey: ["requests"],
    queryFn: () => axios.get("/seller/products/"),
    select: (res) => res.data,
  });

  console.log("requestdata: ", requestData);

  // 나의 지원탭
  const { data: applyData } = useQuery({
    queryKey: ["apply"],
    queryFn: () => axios.get("/orders/"),
    select: (res) => res.data,
  });

  console.log("apply data: ", applyData);

  console.log(`유저 아이디 : ${users.item._id}`);
  const mutation = useMutation({
    mutationFn: (updatedData) => axios.patch(`/users/${users.item._id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", _id] }); // 성공 후 유저 프로필 데이터를 새로고침
      alert("수정 성공");
      setIsEditing(false); // 수정 완료 후 편집 상태 종료
    },
    onError: (error) => {
      console.error(error);
      alert("잠시 후 다시 시도해주세요.");
    },
  });

  // 자기소개 수정 핸들러
  const [introduction, setIntroduction] = useState(users?.item?.extra?.introduction || "");
  const handleSaveClick = () => {
    mutation.mutate({ introduction });
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setIntroduction(users?.item?.extra?.introduction || "");
  };

  if (isLoading) return <div>로딩 중...</div>;

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
      <div className="w-full max-w-[393px] mx-auto h-screen bg-background-color">
        <Profile
          image={users.item.image}
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
                  {!isEditing ? (
                    <button onClick={handleEditClick} className="text-primary-500 font-bold text-sm">
                      수정하기
                    </button>
                  ) : (
                    <button onClick={handleCancelClick} className="text-gray-500 font-bold text-sm">
                      취소하기
                    </button>
                  )}
                </div>
                {!isEditing ? (
                  <p>{introduction}</p>
                ) : (
                  <>
                    <textarea
                      value={introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      className="w-full h-20 border border-gray-300 rounded-md p-2"
                      placeholder="자기소개를 입력하세요."
                    />
                    <button
                      onClick={handleSaveClick}
                      className="bg-primary-500 text-white font-bold px-4 py-2 rounded-md mt-3"
                    >
                      저장하기
                    </button>
                  </>
                )}
              </div>
              <div className="intro bg-white p-5 my-3">
                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">심부름</h3>
                  <a href="#" className="text-primary-500 font-bold text-sm">
                    수정하기
                  </a>
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
                  <a href="#" className="text-primary-500 font-bold text-sm"></a>
                </div>
                <ul className="flex space-x-3">
                  {users.item.extra.transportation?.map((transport, index) => (
                    <li key={index} className="flex items-center">
                      <p className="bg-gray-100 px-2 py-1 rounded-md">{transport}</p>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold mt-6 text-gray-700">심부름 상세 (선택)</h3>
                <p className="text-gray-700 text-sm mb-3">가격이나 자주 하는 질문 또는 안내사항을 작성할 수 있어요</p>
                <select name="" id="" className="w-full h-14 bg-gray-100 rounded-[10px] px-4">
                  <option value="예시1">예시1</option>
                  <option value="예시2">예시2</option>
                </select>
              </div>
              <div className="intro bg-white p-5 mt-3 mb-[150px]">
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
              <MyRequests requestData={requestData} />
            </div>
          )}

          {activeTab === "apply" && (
            <div id="apply" className="tab-content p-4">
              <MyApplies applyData={applyData} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
