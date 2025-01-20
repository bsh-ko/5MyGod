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
    const errorMessage = error.response.data.message || "유저 정보를 가져오는 데 실패했습니다.";
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
      <div className="w-full max-w-[393px] mx-auto h-screen bg-background-color">
        <Profile
          image={users.item.image}
          nickname={users.item.name || "닉네임 미설정"}
          hearts={users.item.extra.likes || "0"}
          isMyPage={false}
        />

        <section className="mt-5 font-pretendard">
          {/* <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} /> */}
          {activeTab === "intro" && (
            <div id="intro" className="tab-content">
              <div className="intro bg-white p-5">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold mb-3 text-gray-700">자기소개</h3>
                </div>
                <p className="text-gray-black-900">{users.item.extra.introduction || "자기소개 내용이 없습니다."}</p>
              </div>
              <div className="intro bg-white p-5 my-3">
                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">심부름</h3>
                </div>
                <ul className="flex space-x-3">
                  {users.item.extra.errands && users.item.extra.errands.length > 0 ? (
                    users.item.extra.errands.map((task, index) => (
                      <li key={index} className="flex items-center">
                        <p className="bg-gray-100 px-2 py-1 rounded-md text-gray-black-900">{task}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-black-900">등록한 심부름이 없습니다.</p>
                  )}
                </ul>

                <div className="flex justify-between my-3">
                  <h3 className="text-lg font-bold text-gray-700">이동 수단</h3>
                </div>
                <ul className="flex space-x-3">
                  {users.item.extra.transportation && users.item.extra.transportation.length > 0 ? (
                    users.item.extra.transportation?.map((transport, index) => (
                      <li key={index} className="flex items-center">
                        <p className="bg-gray-100 px-2 py-1 rounded-md text-gray-black-900">{transport}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-black-900">등록한 이동 수단이 없습니다.</p>
                  )}
                </ul>

                {users.item.extra.details.length > 0 && (
                  <>
                    <div className="flex justify-between my-3">
                      <h3 className="text-lg font-bold text-gray-700">심부름 상세</h3>
                    </div>
                    <p className="w-full h-14 bg-gray-100 rounded-[10px] px-4 leading-[56px]">
                      {users.item.extra.details}
                    </p>
                  </>
                )}
              </div>

              {(users.item.extra.experience.length > 0 ||
                users.item.extra.certificates.length > 0 ||
                users.item.extra.business.length > 0) && (
                <div className="intro bg-white p-5 mt-3 mb-[150px]">
                  {users.item.extra.experience && users.item.extra.experience.length > 0 && (
                    <>
                      <h3 className="text-lg font-bold text-gray-700 pb-3">경력</h3>
                      {/* <ul className="flex flex-wrap h-14 bg-gray-100 rounded-[10px] px-4">
                        {users.item.extra.experience
                          .reduce((acc, exp, index) => {
                            const threeIndex = Math.floor(index / 3); // 3개씩 묶기 위한 인덱스 계산
                            if (!acc[threeIndex]) {
                              acc[threeIndex] = []; // 새로운 그룹 생성
                            }
                            acc[threeIndex].push(exp); // 각 그룹에 항목 추가
                            return acc;
                          }, [])
                          .map((three, threeIndex) => (
                            <li key={threeIndex} className="flex pr-3">
                              {three.map((exp, index) => (
                                <span
                                  key={index}
                                  className={`leading-[56px] pr-3 ${
                                    index === 0 ? "font-bold" : "text-gray-700 text-sm"
                                  }`}
                                >
                                  {exp}
                                </span>
                              ))}
                            </li>
                          ))}
                      </ul> */}
                      <ul>
                        {users.item.extra.experience.map((experience, index) => (
                          <li key={index} className="w-full h-14 bg-gray-100 rounded-[10px] px-4 mb-2 leading-[56px]">
                            {experience}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {users.item.extra.certificates && users.item.extra.certificates.length > 0 && (
                    <>
                      <h3 className="text-lg font-bold mt-6 text-gray-700 pb-3">자격증</h3>
                      <ul>
                        {users.item.extra.certificates.map((cert, index) => (
                          <li key={index} className="w-full h-14 bg-gray-100 rounded-[10px] px-4 mb-2 leading-[56px]">
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {users.item.extra.business && users.item.extra.business.length > 0 && (
                    <>
                      <h3 className="text-lg font-bold mt-6 text-gray-700 pb-3">사업자</h3>
                      <ul>
                        {users.item.extra.business.map((bus, index) => (
                          <li key={index} className="w-full h-14 bg-gray-100 rounded-[10px] px-4 mb-2 leading-[56px]">
                            {bus}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
