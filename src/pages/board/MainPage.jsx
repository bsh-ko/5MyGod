import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";
import { useQuery } from "@tanstack/react-query";

export default function MainPage() {
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("/products"),
    select: (res) => res.data,
  });

  console.log("data: ", data);

  if (!data) {
    return <div>로딩 중...</div>;
  }

  const list = data.item.map((item) => <ListItem key={item._id} item={item} />);

  return (
    <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
      <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px]">
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

        <ul className="list flex flex-col items-center gap-[24px]">{list}</ul>
      </main>
      <div className="pb-40 bg-background-color"></div>
    </div>
  );
}
