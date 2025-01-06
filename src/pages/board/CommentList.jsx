import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function CommentList() {
  const axios = useAxiosInstance();

  const { _id } = useParams();

  const { data } = useQuery({
    queryKey: ["replies", _id],
    queryFn: () => axios.get(`/replies/products/${_id}`),
    select: (res) => res.data,
  });

  console.log("replies data: ", data);

  if (!data) {
    return <div>댓글 로드 중...</div>;
  }

  const commentList = data.item.map((item) => (
    <CommentListItem key={item._id} item={item} />
  ));

  return (
    <>
      <div className="comments bg-[#fff] p-[22px] rounded-lg shadow-card-shadow flex flex-col gap-[20px]">
        <h2 className="font-laundry text-[16px] text-gray-700">댓글 목록</h2>

        <ul className="list flex flex-col items-center gap-[24px]">
          {commentList}
        </ul>
      </div>

      <CommentNew />
    </>
  );
}
