import React, { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);

        // Axios 인스턴스를 사용하여 API 호출
        const response = await axiosInstance.get("/seller/oders"); //
        const data = response.data;

        // 데이터 설정
        setApplicants(data.items || []);
      } catch (error) {
        console.error("지원자 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-[393px] min-h-[852px] max-h-screen flex flex-col bg-white overflow-hidden">
      {/* ✅ 지원자 목록 */}
      <main className="font-Pretendard text-gray-black-900 flex-1 p-4 space-y-6 overflow-y-auto bg-[#F5F9FF]">
        {applicants.map((applicant) => (
          <div
            key={applicant.id} // 고유한 ID 사용
            className="w-[360px] h-[84px] flex-shrink-0 flex items-center justify-between bg-white rounded-[10px] shadow-card-shadow"
          >
            <div className="flex items-center ml-[23px]">
              <div
                className="w-[42px] h-[42px] flex-shrink-0 rounded-full bg-[#D9D9D9] mr-4"
                style={{
                  backgroundImage: `url(${applicant.profileImage || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div>
                <h3 className="text-sm font-bold">{applicant.name}</h3>
                <p className="text-xs">{applicant.description}</p>
              </div>
            </div>
            <button className="font-laundry w-[77px] h-[84px] flex-shrink-0 rounded-r-[10px] bg-[#4849E8] text-white text-sm">
              수락하기
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ApplicantList;
