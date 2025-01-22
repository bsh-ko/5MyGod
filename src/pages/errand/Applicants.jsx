import React, { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useParams, useNavigate, Link } from "react-router-dom";
import useNotificationHandler from "@hooks/useNotificationCreate";


const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const { _id } = useParams();
  const clientId = "final05";

  // 이미지 로드 실패시 사용할 기본 이미지 경로
  const defaultImagePath = `/files/${clientId}/guy.webp`;

  const handleImageError = (e) => {
    e.target.onerror = null; // 무한 로딩 방지
    e.target.src = defaultImagePath;
  };

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/seller/orders"); // 나에게 들어온 모든 지원 목록
      const data = response.data;

      if (data.ok === 1) {
        console.log("API 응답 데이터:", data);
        const filteredItems = data.item.filter(
          (item) => item.products[0]._id === parseInt(_id) // 현재 보고 있는 상품에 대한 지원만 필터링
        );

        if (filteredItems.length > 0) {
          setCurrentProduct(filteredItems[0].products[0]);
        }

        // 필터링된 지원 아이템 하나하나를 형식에 맞게 가공
        const formattedApplicants = filteredItems.map((item) => ({
          apply_id: item._id, // 지원 아이템의 번호
          apply_state: item.state, // 지원 아이템의 상태
          user_id: item.user._id, // 지원한 유저의 번호
          name: item.user.name,
          description: item.user.extra.introduction || "소개글이 없습니다.",
          profileImage: item.user.image,
          productId: item.products[0]._id, // 지원 대상 심부름의 번호
          productState: item.products[0].extra.productState[0], // 지원 대상 심부름의 상태
          matchedOrderId: item.products[0].extra.matchedOrderId || null, // 지원 대상 심부름이 몇번 지원과 매칭되었는지
          matchedUserId: item.products[0].extra.matchedUserId || null, // 지원 대상 심부름이 몇번 유저와 매칭되었는지
        }));

        setApplicants(formattedApplicants); // 가공된 지원 아이템들로 applicants를 업데이트
        setLoading(false);
      }
    } catch (error) {
      console.error("지원자 데이터를 가져오는 중 오류 발생:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleAcceptApplicant = async (productId, applyId, applicantId) => {
    try {
      // 지원 대상 상품의 extra 데이터를 수정
      const productResponse = await axiosInstance.get(
        `/seller/products/${productId}`
      );
      const currentProductData = productResponse.data.item; // 현재 상품(심부름) 데이터

      const updatedExtra = {
        ...currentProductData.extra,
        productState: ["PS020"],
        matchedOrderId: applyId, // 몇번 지원과 매칭되었는지
        matchedUserId: applicantId, // 몇번 유저와 매칭되었는지
      };

      const response = await axiosInstance.patch(`/seller/products/${_id}`, {
        extra: updatedExtra,
      });

      // 지원 아이템의 상태를 수정
      const applyResponse = await axiosInstance.get(
        `/seller/orders/${applyId}` // 선택한 지원의 데이터 받아오기
      );

      const selectedApplyData = applyResponse.data.item; // 선택한 지원 데이터

      const updatedApply = {
        ...selectedApplyData,
        state: "PS020", // 지원 상태 변경
      };

      const applyUpdateResponse = await axiosInstance.patch(
        `/seller/orders/${applyId}`,
        updatedApply
      );

      if (response.data.ok === 1) {
        console.log("지원 대상 상품 데이터 수정 성공: ", response.data);
      } else {
        console.error("지원 대상 상품 데이터 수정 실패: ", response.data);
      }

      if (applyUpdateResponse.data.ok === 1) {
        console.log("지원 데이터 수정 성공: ", applyUpdateResponse.data);
        alert("심부름 지원을 수락하였습니다.");

        // MyPage의 나의 요청 탭으로 이동
        navigate("/users/mypage?tab=requests");
      } else {
        console.error("지원 데이터 수정 실패: ", applyUpdateResponse.data);
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
      <main className="font-Pretendard text-gray-black-900 flex-1 p-4 space-y-6 overflow-y-auto bg-[#fff] relative">
        {isMatchedExists ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
            <div className="text-center">
              <div className="text-xl font-semibold text-[#4849E8] mb-2">
                매칭이 완료된 심부름입니다
              </div>
              <div className="text-gray-600">
                다른 지원자들의 지원은 자동으로 마감되었습니다
              </div>
            </div>
          </div>
        ) : null}

        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div
              key={applicant.apply_id}
              className={`w-full h-[84px] flex items-center bg-white rounded-[10px] shadow-card-shadow ${
                isMatchedExists && applicant.productState !== "PS020"
                  ? "opacity-50"
                  : ""
              }`}
            >
              <Link to={`/users/${applicant.user_id}`} className="grow">
                <div className="flex items-center ml-[16px] flex-grow">
                  <img
                    src={`https://11.fesp.shop${applicant.profileImage}`}
                    alt={`${applicant.name}의 프로필`}
                    onError={handleImageError}
                    className="w-[42px] h-[42px] rounded-full object-cover mr-[16px] cursor-pointer"
                  />

                  <div className="flex flex-col justify-center">
                    <h3 className="font-Pretendard text-[18px] font-semibold text-gray-black-900 tracking-[-1.08px]">
                      {applicant.name}
                    </h3>
                    <p className="font-Pretendard text-[16px] font-medium text-gray-black-900 tracking-[-0.96px]">
                      {applicant.description}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className={`w-[77px] h-[84px] flex-shrink-0 rounded-r-[10px] ${
                  isMatchedExists || applicant.productState === "PS020"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#4849E8] cursor-pointer"
                } text-white shadow-card-shadow`}
                onClick={() =>
                  handleAcceptApplicant(
                    applicant.productId,
                    applicant.apply_id,
                    applicant.user_id
                  )
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

export default Applicants;
