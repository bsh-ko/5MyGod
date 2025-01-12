import { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import useUserStore from "@zustand/userStore";
import ListItem from "@pages/board/ListItem";

const MyErrand = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useUserStore(); // Zustand에서 사용자 정보 가져오기
  const [errandItems, setErrandItems] = useState([]); // API에서 가져온 데이터 저장
  const [activeTab, setActiveTab] = useState("부탁한 심부름"); // 초기 탭 설정
  const [loading, setLoading] = useState(false); // 로딩 상태

  // API 호출 함수
  const fetchErrands = async (endpoint) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        params: { userId: user?._id }, // 사용자 ID를 포함
      });
      console.log(`${activeTab} 데이터:`, response.data);
      setErrandItems(response.data?.item || []); // API 결과를 상태로 설정
    } catch (error) {
      console.error(`${activeTab} API 호출 오류:`, error);
    } finally {
      setLoading(false);
    }
  };

  // 탭 변경 및 초기 로드 시 데이터 가져오기
  useEffect(() => {
    if (!user) {
      console.warn("사용자 정보가 없습니다.");
      return;
    }

    const endpoint = activeTab === "지원한 심부름" ? "/orders" : "/products";
    fetchErrands(endpoint);
  }, [activeTab, user]);

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-auto">
      {/* ✅ 네비게이션 탭 */}
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

      {/* ✅ 로딩 중 상태 */}
      {loading && <div className="text-center text-gray-500">로딩 중...</div>}

      {/* ✅ 데이터 렌더링 */}
      {!loading && errandItems.length > 0 && (
        <ul className="list flex flex-col items-center gap-[24px]">
          {errandItems.map((item) => (
            <ListItem key={item._id} item={item.products[0]} />
          ))}
        </ul>
      )}

      {/* ✅ 데이터가 없을 경우 */}
      {!loading && errandItems.length === 0 && (
        <div className="text-gray-500">게시글이 없습니다.</div>
      )}
    </main>
  );
};

export default MyErrand;
