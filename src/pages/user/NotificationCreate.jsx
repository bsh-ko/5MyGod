import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function NotificationCreate() {
  const axios = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/notifications", data);
      return response.data;
    },
  });

  const handleButtonClick = () => {
    const notificationData = {
      type: "apply", // apply || comment || expired
      target_id: 4, // 알림을 받는 사람의 _id값 product?.item?.seller?._id
      channel: "toast",
      content: "종로구뽀또그래퍼님이 지원했어요.", // `${지원자 닉네임}님이 지원했어요.`
      extra: {
        url: "/errand/2", // `/errand/${productId}`
        errand_title: "SNS 프로필 사진 찍어주세요", //product?.item?.name
      },
    };

    mutation.mutate(notificationData);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Send Notification
    </button>
  );
}

/*{
    "type": "qna",
    "target_id": 4,
    "channel": "toast",
    "content": "종로구뽀또그래퍼님이 지원했어요.",
    "extra": {
      "url": "/errand/2",
      "errand_title": "SNS 프로필 사진 찍어주세요"
    }
  }
*/
