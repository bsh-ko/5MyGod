import { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import useUserStore from "@zustand/userStore";
import ListItem from "@pages/board/ListItem";

const MyErrand = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useUserStore();
  const [errandItems, setErrandItems] = useState([]);
  const [activeTab, setActiveTab] = useState("부탁한 심부름");
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const fetchErrands = async (endpoint) => {
    try {
      setLoading(true);

      // API 호출
      const response = await axiosInstance.get(endpoint, {
        params:
          activeTab === "지원한 심부름" ? { userId: user?._id } : undefined,
      });

      // 데이터 구조에 따라 처리
      if (activeTab === "지원한 심부름") {
        // orders의 경우 item.products[0]
        setErrandItems(
          response.data?.item.map((order) => order.products[0]) || []
        );
      } else {
        // products의 경우 item 자체
        setErrandItems(response.data?.item || []);
      }
    } catch (error) {
      console.error(`${activeTab} API 호출 오류:`, error);
    } finally {
      setLoading(false);
    }
  };

  // 탭 변경 및 초기 데이터 로드
  useEffect(() => {
    if (!user) {
      console.warn("사용자 정보가 없습니다.");
      return;
    }

    // API 엔드포인트 결정
    const endpoint = activeTab === "지원한 심부름" ? "/orders" : "/products";

    // API 호출
    fetchErrands(endpoint);
  }, [activeTab, user]); // activeTab 또는 user 변경 시 호출

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-auto">
      {/* 탭 네비게이션 */}
      <div className="px-4 py-2">
        <nav className="max-w-full bg-gray-100 border border-gray-200 rounded-lg p-2">
          <div className="flex justify-between items-center gap-2">
            <button
              className={`font-laundry w-1/2 text-center py-2 rounded-lg font-medium ${
                activeTab === "지원한 심부름"
                  ? "bg-white shadow-md"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("지원한 심부름")}
            >
              지원한 심부름
            </button>
            <button
              className={`font-laundry w-1/2 text-center py-2 rounded-lg font-medium ${
                activeTab === "부탁한 심부름"
                  ? "bg-white shadow-md"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("부탁한 심부름")}
            >
              부탁한 심부름
            </button>
          </div>
        </nav>
      </div>

      {/* 로딩 표시 */}
      {loading && <div className="text-center text-gray-500">로딩 중...</div>}

      {/* 데이터 렌더링 */}
      {!loading && errandItems.length > 0 && (
        <ul className="list flex flex-col items-center gap-[24px]">
          {errandItems.map((item, index) => (
            <ListItem key={item._id || index} item={item} />
          ))}
        </ul>
      )}

      {/* 데이터가 없을 때 */}
      {!loading && errandItems.length === 0 && (
        <div className="text-gray-500">게시글이 없습니다.</div>
      )}
    </main>
  );
};

export default MyErrand;
