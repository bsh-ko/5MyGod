import { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";

const MyErrand = () => {
  const axiosInstance = useAxiosInstance();
  const [errandItems, setErrandItems] = useState([]);

  useEffect(() => {
    async function fetchErrands() {
      try {
        const response = await axiosInstance.get("/orders", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi7Ja07ZS87LmYIiwiZW1haWwiOiJzMkBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwNS91c2VyLWFwZWFjaC53ZWJwIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzY0MDgwMDQsImV4cCI6MTczNjQ5NDQwNCwiaXNzIjoiRkVTUCJ9.Xq33CL6L0GJ9HH7DJ4Qzj3HuZzOpKX332oAnRsh5cLM`,
          },
        });
        console.log("API 응답 데이터:", response.data);

        setErrandItems(response.data?.item);
      } catch (err) {
        console.error("API 호출 오류:", err);
      }
    }

    fetchErrands();
  }, []);

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-auto">
      {/* ✅ 내가 작성한 게시글 목록 */}

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

      {errandItems && (
        <ul className="list flex flex-col items-center gap-[24px]">
          {errandItems.map((item) => (
            <ListItem key={item._id} item={item.products[0]} />
          ))}
        </ul>
      )}

      {/* ✅ 게시글이 없을 때 */}
      {errandItems && errandItems.length === 0 && (
        <div className="text-gray-500">내가 작성한 게시글이 없습니다.</div>
      )}
    </main>
  );
};

export default MyErrand;
