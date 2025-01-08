import { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";

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

const MyErrand = () => {
  const axiosInstance = useAxiosInstance();
  const [errandItems, setErrandItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchErrands() {
      try {
        const response = await axiosInstance.get("/posts/users");
        console.log("API 응답 데이터:", response.data);

        const allItems = response.data.item;
        const currentUserId = sessionStorage.getItem("userId");

        const myItems = allItems.filter(
          (item) => item.user._id === Number(currentUserId)
        );

        setErrandItems(myItems);
      } catch (err) {
        console.error("API 호출 오류:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchErrands();
  }, [axiosInstance]);

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-auto">
      {/* ✅ 내가 작성한 게시글 목록 */}
      <TabMenu />
      <MatchingTab />
      {!loading && !error && errandItems.length > 0 && (
        <ul className="list flex flex-col items-center gap-[24px]">
          {errandItems.map((item) => (
            <ListItem key={item._id} item={item} />
          ))}
        </ul>
      )}

      {/* ✅ 게시글이 없을 때 */}
      {!loading && !error && errandItems.length === 0 && (
        <div className="text-gray-500">내가 작성한 게시글이 없습니다.</div>
      )}

      {/* ✅ 로딩 상태 */}
      {loading && <div>로딩 중...</div>}
      {/* ✅ 오류 상태 */}
      {error && <div>오류 발생: {error.message}</div>}
    </main>
  );
};

export default MyErrand;
