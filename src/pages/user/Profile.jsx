import React from "react";

export default function Profile({ nickname, ageGroup, gender, earnings, hearts }) {
  return (
    <section className="flex items-center mt-6 px-4 font-laundry">
      {/* 프로필 이미지 */}
      <img
        src="https://via.placeholder.com/100"
        alt="프로필 이미지"
        className="w-20 h-20 rounded-full border border-gray-300"
      />
      <div className="ml-4 flex flex-col space-y-2 text-gray-black-900">
        {/* 닉네임과 추가 정보 */}
        <div className="flex items-center space-x-4">
          <h2 className="text-xl">{nickname || "닉네임"}</h2>
          <p className="font-pretendard text-[16px] leading-[20px]">{`${ageGroup || ""} ${gender || ""}`}</p>
        </div>
        {/* 수익금과 하트 */}
        <div className="flex items-center gap-4">
          {/* 수익금 */}
          <div className="flex items-center justify-between w-40 h-10 px-4 bg-white rounded-[10px]">
            <span className="text-gray-700 text-sm leading-[20px]">수익금:</span>
            <span className="text-gray-black-900 text-sm leading-[20px]">{earnings || "0"}</span>
          </div>
          {/* 하트 */}
          <div className="flex items-center justify-between w-20 h-10 px-3 bg-white rounded-[10px]">
            <img src="/assets/heart.png" alt="하트 아이콘" className="w-5 h-5" />
            <span className="text-gray-black-900 text-sm leading-[20px]">{hearts || "0"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
