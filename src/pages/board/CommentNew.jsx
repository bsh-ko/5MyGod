import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function CommentNew() {
  // 폼 유효성 검사 훅
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const axios = useAxiosInstance();

  const { _id } = useParams();

  const queryClient = useQueryClient();

  // useMutation 통신으로 댓글 추가
  const addReply = useMutation({
    mutationFn: (formData) => {
      const body = {
        order_id: 1, // 필수 값인데 용도를 모르겠어서 우선 1로 하드코딩
        product_id: _id, // 현재 보고 있는 상품(심부름 글)의 번호
        content: formData.content, // 댓글 내용
        extra: {
          createdAt: new Date().toISOString(), // 생성 시간
        },
      };
      return axios.post(`/replies/`, body);
    },

    onSuccess: () => {
      // 댓글 목록 캐시를 무효화하고 업데이트
      queryClient.invalidateQueries({ queryKey: ["replies", _id] });
      reset({ content: "" });
    },

    onError: (err) => {
      console.error(err);
      alert("댓글 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  const onSubmit = (formData) => {
    addReply.mutate(formData);
  };

  return (
    <form
      className="comment-form flex gap-[12px] items-center"
      // handleSubmit의 첫번째 콜백함수(유효성 검증 통과 시), 두번째 콜백함수(유효성 검증 실패 시)
      onSubmit={handleSubmit(onSubmit, (validationErrors) => {
        if (validationErrors.content) {
          alert(validationErrors.content.message);
          setFocus("content");
        }
      })}
    >
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        className="comment-input flex-grow border border-gray-400 rounded-lg p-[10px] text-regular-text w-full"
        {...register("content", { required: "댓글의 내용을 입력해주세요." })}
      />

      <button
        type="submit"
        className="submit-btn bg-primary-500 text-white rounded-lg p-[10px] font-bold font-laundry min-w-[48px] flex-shrink-0"
      >
        제출
      </button>
    </form>
  );
}
