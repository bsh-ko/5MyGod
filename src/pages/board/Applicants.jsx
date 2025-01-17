import React, { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useParams } from "react-router-dom";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const { _id } = useParams();
  const clientId = "exampleClientId";

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/seller/orders");
        const data = response.data;

        console.log("현재 clientId 값:", clientId);
        const imagePath = `/files/${clientId}/user-neo.webp`;

        if (data.ok === 1) {
          const filteredItems = data.item.filter(
            (item) => item.products[0]._id === parseInt(_id)
          );

          const formattedApplicants = filteredItems.map((item) => ({
            id: item.user._id,
            name: item.user.name,
            description: item.user.extra.introduction || "소개글이 없습니다.",
            profileImage: item.user.image || imagePath,
            productId: item.products[0]._id,
            productState: item.products[0].productState, // 제품 상태 추가
            matchedUserId: item.products[0].matchedUserId || null, // 매칭된 사용자 ID
          }));

          setApplicants(formattedApplicants);
        }
      } catch (error) {
        console.error("지원자 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleAcceptApplicant = async (productId, applicantId) => {
    try {
      // 서버에 PATCH 요청 전송
      const response = await axiosInstance.patch(`/seller/orders/${_id}`, {
        state: "PS020", // 변경할 상태
        matchedUserId: applicantId, // 선택된 지원자 ID
      });

      if (response.data.ok === 1) {
        console.log("지원자 수락 성공:", response.data); // item{matchedUserId:2, state:"PS020", _id: 1}

        // UI 갱신: 상태 및 매칭된 사용자 업데이트
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant.id === applicantId
              ? {
                  ...applicant,
                  productState: "PS020",
                  matchedUserId: applicantId,
                }
              : applicant
          )
        );
      } else {
        console.error("지원자 수락 실패:", response.data);
      }
    } catch (error) {
      console.error("지원자 수락 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-[393px] min-h-[852px] max-h-screen flex flex-col bg-[#F5F9FF] overflow-hidden">
      <main className="font-Pretendard text-gray-black-900 flex-1 p-4 space-y-6 overflow-y-auto bg-[#fff]">
        {applicants.length > 0 ? (
          applicants.map((applicant) => {
            console.log("프로필 이미지 URL:", applicant.profileImage);
            return (
              <div
                key={applicant.id}
                className="w-[360px] h-[84px] flex-shrink-0 flex items-center bg-white rounded-[10px] shadow-card-shadow"
              >
                <div className="flex items-center ml-[16px] flex-grow">
                  <div
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
                <button
                  className="font-laundry w-[77px] h-[84px] flex-shrink-0 rounded-r-[10px] bg-[#4849E8] text-white shadow-card-shadow"
                  onClick={() =>
                    handleAcceptApplicant(applicant.productId, applicant.id)
                  }
                >
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
