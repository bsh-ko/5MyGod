import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  // 상품(심부름) 목록 가져오기
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("/products"),
    select: (res) => res.data,
  });
  console.log("심부름 목록: ", data);

  if (!data) {
    return <div>로딩 중...</div>;
  }

  // ListItem 순회 호출
  const list = data.item.map((item) => <ListItem key={item._id} item={item} />);

  const handleRequestClick = () => {
    navigate(`/errand/new`); // 작성페이지로 이동
    window.scrollTo(0, 0); // 스크롤 위치 초기화
  };

  return (
    <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
      <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] relative">
        <div className="list_info font-laundry text-[14px] text-gray-700 flex justify-between items-center px-2">
          <p>
            심부름 <span className="text-red-500">{data.item.length}건이</span>{" "}
            있어요
          </p>

          <div className="flex gap-4">
            <img src="/assets/filter.svg" />
            <img src="/assets/search.svg" />
          </div>
        </div>

        <ul className="list flex flex-col items-center gap-[24px] pb-[80px]">
          {list}
        </ul>

        <button
          type="button"
          onClick={() => {
            handleRequestClick();
          }}
          className="bg-primary-500 font-laundry text-[24px] text-white p-[20px] rounded-t-lg absolute bottom-0 left-0 w-full"
        >
          새로운 심부름 요청하기
        </button>
      </main>
    </div>
  );
}
