import React, { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useParams } from "react-router-dom"; // 게시글 번호(_id) 가져오기 위해 사용

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const { _id } = useParams(); // 디테일에서 URL의 게시글 번호를 가져옴
  const clientId = "exampleClientId";

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);

        // /seller/orders API 호출
        const response = await axiosInstance.get("/seller/orders");
        const data = response.data; //데이터 획득
        console.log("현재 clientId 값:", clientId); // clientId 확인

        const imagePath = `/files/${clientId}/user-neo.webp`;
        console.log("생성된 이미지 경로:", imagePath); // 이미지 경로 확인

        if (data.ok === 1) {
          // A 데이터와 비교하여 B 데이터 필터링
          const filteredItems = data.item.filter(
            (item) => item.products[0]._id === parseInt(_id) // 게시글 번호(_id)와 일치하는 데이터 필터링
          );

          // 필터링된 데이터에서 applicants 데이터를 생성
          const formattedApplicants = filteredItems.map((item) => ({
            id: item.user._id,
            name: item.user.name,
            description: item.user.extra.introduction || "소개글이 없습니다.",
            profileImage: item.user.image || imagePath, // 기본 이미지 경로를 imagePath로 설정
          }));

          setApplicants(formattedApplicants); //applicants에 저장
        }
      } catch (error) {
        console.error("지원자 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []); // _id가 변경될 때마다 useEffect 재실행 이부분 때문에 오류나서 삭제

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-[393px] min-h-[852px] max-h-screen flex flex-col bg-[#F5F9FF] overflow-hidden">
      {/* 지원자 목록 */}
      <main className="font-Pretendard text-gray-black-900 flex-1 p-4 space-y-6 overflow-y-auto bg-[#fff]">
        {applicants.length > 0 ? (
          applicants.map((applicant) => {
            console.log("프로필 이미지 URL:", applicant.profileImage); // 이미지 URL 디버깅 로그
            return (
              <div
                key={applicant.id}
                className="w-[360px] h-[84px] flex-shrink-0 flex items-center bg-white rounded-[10px] shadow-card-shadow"
              >
                <div className="flex items-center ml-[16px] flex-grow">
                  <div
                    // 프로필 이미지
                    className="w-[42px] h-[42px] rounded-full bg-[#D9D9D9] mr-[16px]"
                    style={{
                      backgroundImage: `url(${applicant.profileImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-Pretendard text-[18px] font-semibold text-gray-black-900 tracking-[-1.08px]">
                      {applicant.name}
                    </h3>
                    <p className="font-Pretendard text-[16px] font-medium text-gray-black-900 tracking-[-0.96px]">
                      {applicant.description}
                    </p>
                  </div>
                </div>
                <button className="font-laundry w-[77px] h-[84px] flex-shrink-0 rounded-r-[10px] bg-[#4849E8] text-white shadow-card-shadow">
                  수락하기
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-black-700">
            지원자가 없습니다.
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplicantList;
