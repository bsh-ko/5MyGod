import React, { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const { _id } = useParams();
  const clientId = "final05";

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/seller/orders");
        const data = response.data;

        if (data.ok === 1) {
          const imagePath = `/files/${clientId}/user-neo.webp`;
          const filteredItems = data.item.filter(
            (item) => item.products[0]._id === parseInt(_id)
          );

          const formattedApplicants = filteredItems.map((item) => ({
            id: item.user._id,
            name: item.user.name,
            description: item.user.extra.introduction || "소개글이 없습니다.",
            profileImage: item.user.image || imagePath,
            productId: item.products[0]._id,
            productState: item.products[0].extra.productState[0],
            matchedUserId: item.products[0].extra.matchedUserId || null,
          }));

          setApplicants(formattedApplicants);
          setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 변경
        }
      } catch (error) {
        console.error("지원자 데이터를 가져오는 중 오류 발생:", error);
        setLoading(false); // 에러가 발생해도 loading 상태를 false로 변경
      }
    };

    fetchApplicants();
  }, []);

  const handleAcceptApplicant = async (productId, applicantId) => {
    try {
      // products의 extra 필드 내의 productState와 matchedUserId를 업데이트
      const response = await axiosInstance.patch(`/seller/products/${_id}`, {
        extra: {
          productState: ["PS020"], // 배열 형태로 전송
          matchedUserId: applicantId,
        },
      });

      if (response.data.ok === 1) {
        console.log("지원자 수락 성공:", response.data);

        // 로컬 상태 업데이트 후 새로운 데이터를 다시 불러오기
        await fetchApplicants(); // 데이터 리프레시

        // 성공 시 심부름 요청한 페이지로 이동
        navigate("/errand-requested");
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

  const isMatchedExists = applicants.some(
    (app) => app.productState === "PS020"
  );

  return (
    <div className="w-[393px] min-h-[852px] max-h-screen flex flex-col bg-[#F5F9FF] overflow-hidden">
      <main className="font-Pretendard text-gray-black-900 flex-1 p-4 space-y-6 overflow-y-auto bg-[#fff]">
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
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
                className={`w-[77px] h-[84px] flex-shrink-0 rounded-r-[10px] ${
                  isMatchedExists || applicant.productState === "PS020"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#4849E8] cursor-pointer"
                } text-white shadow-card-shadow`}
                onClick={() =>
                  handleAcceptApplicant(applicant.productId, applicant.id)
                }
                disabled={isMatchedExists || applicant.productState === "PS020"}
              >
                {applicant.productState === "PS020" ? "매칭완료" : "수락하기"}
              </button>
            </div>
          ))
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
