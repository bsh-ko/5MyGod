import { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";

const MyErrand = () => {
  const axiosInstance = useAxiosInstance();
  const [errandItems, setErrandItems] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]); // 엑티브 탭 변경될 때 마다 fetchData 실행

  const fetchData = async (type) => {
    setIsLoading(true);
    try {
      const endpoint = type === "orders" ? "/orders" : "/products";
      const response = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi7KCc7J207KeAIiwiZW1haWwiOiJ1MUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwNS91c2VyLWpheWcud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzM2NDQxNTU0LCJleHAiOjE3MzY1Mjc5NTQsImlzcyI6IkZFU1AifQ.IuIlea_OGwdLlBU6iua663_U5fgipaCox5O9Pz-VnJE`,
        },
      });

      // 데이터 확인
      console.log(`${type} API 응답 데이터:`, response.data);
      console.log("errandItems 데이터 구조:", errandItems);

      // item 필드 존재 여부 확인 후 설정
      if (response.data && response.data.item) {
        setErrandItems(response.data.item);
      } else {
        console.warn("item 필드가 응답 데이터에 없습니다.");
        setErrandItems([]); // 빈 배열로 초기화
      }
    } catch (err) {
      console.error("API 호출 오류:", err);
      setErrandItems([]); // 오류 시 빈 배열로 초기화
    }
  };

  //탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-auto">
      {/* ✅ 내가 작성한 게시글 목록 */}

      <div className="px-4 py-2">
        <nav className="max-w-full bg-gray-100 border border-gray-200 rounded-lg p-2">
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => handleTabChange("orders")}
              className={`font-laundry w-1/2 text-center py-2 rounded-lg font-medium ${
                activeTab === "orders" ? "bg-white shadow-md" : "text-gray-500"
              }`}
            >
              지원한 심부름
            </button>
            <button
              onClick={() => handleTabChange("products")}
              className={`font-laundry w-1/2 text-center py-2 rounded-lg ${
                activeTab === "products"
                  ? "bg-white shadow-md"
                  : "text-gray-500"
              }`}
            >
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
