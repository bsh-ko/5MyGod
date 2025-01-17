import { useLocation } from "react-router-dom";

export default function Applicants() {
  const location = useLocation();
  const { applicantsData } = location.state || {};
  console.log(
    "상세보기 페이지에서 전달 받은 지원자 목록 데이터: ",
    applicantsData
  );

  return (
    <div className="flex flex-col gap-[16px]">
      <h1 className="bg-gray-300 font-laundry text-[24px] p-[8px] text-center rounded-lg shadow-card-shadow">
        지원자 목록
      </h1>
      {applicantsData ? (
        <ul className="flex flex-col gap-[12px]">
          {applicantsData.item.map((applicant, index) => (
            <li
              key={index}
              className="shadow-card-shadow font-pretendard text-[16px] rounded-lg text-center p-[8px]"
            >
              {applicant.user.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 지원자가 없어요</p>
      )}
    </div>
  );
}
