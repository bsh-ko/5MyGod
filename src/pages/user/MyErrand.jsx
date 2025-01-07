import React, { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";
import TagList from "@pages/board/TagList";

// 📝 **TabMenu 컴포넌트**
const TabMenu = () => (
  <div className="px-4 py-2">
    <nav className="max-w-full bg-gray-100 border border-gray-200 rounded-lg p-2">
      <div className="flex justify-between items-center gap-2">
        <button className="font-laundry w-1/2 text-center py-2 rounded-lg font-medium bg-white shadow-md">
          지원한 심부름
        </button>
        <button className="font-laundry w-1/2 text-center py-2 text-gray-500">
          부탁한 심부름
        </button>
      </div>
    </nav>
  </div>
);

// 📝 **MatchingTab 컴포넌트**
const MatchingTab = () => (
  <div className="px-4 py-2">
    <nav className="max-w-full bg-gray-100 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center gap-2">
        <button className="font-laundry w-1/2 text-center py-2 rounded-lg font-medium bg-white shadow-md">
          매칭 전이에요
        </button>
        <button className="font-laundry w-1/2 text-center py-2 text-gray-500">
          매칭 되었어요
        </button>
      </div>
    </nav>
  </div>
);

// 📝 **MyErrand 컴포넌트**
const MyErrand = () => {
  const axiosInstance = useAxiosInstance(); // Axios 인스턴스 가져오기
  const [errandItems, setErrandItems] = useState([]); // API 데이터 상태 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // ✅ API 데이터 불러오기
  useEffect(() => {
    async function fetchErrands() {
      try {
        const response = await axiosInstance.get("/get/users"); // API 호출
        setErrandItems(response.data); // 데이터 저장
      } catch (err) {
        console.error("API 호출 오류:", err);
        setError(err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    }

    fetchErrands();
  }, [axiosInstance]);

  // ✅ 로딩 상태 처리
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-scroll">
      <TabMenu />
      <MatchingTab />
      <ul className="list flex flex-col items-center gap-[24px]">
        {errandItems.map((item) => (
          <ListItem key={item._id} item={item} />
        ))}
      </ul>
    </main>
  );
};

export default MyErrand;
