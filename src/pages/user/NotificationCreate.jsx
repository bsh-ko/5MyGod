import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import PropTypes from "prop-types";

const contentByType = (type, userName) => {
  const contentMap = {
    apply: `${userName}님이 지원했습니다.`,
    comment: `${userName}님이 댓글을 작성했습니다.`,
    expire: "게시 한 심부름의 기한이 만료됐습니다.",
    complete: "심부름을 완료했습니다.",
    accept: `${userName}님이 심부름 지원을 수락했습니다.`,
  };

  return contentMap[type] || "";
};

export default function NotificationCreate({
  type,
  targetId,
  errandId,
  errandTitle,
}) {
  const axios = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/notifications", data);
      return response.data;
    },
  });

  const handleButtonClick = () => {
    const sessionData = sessionStorage.getItem("user");

    const notificationData = {
      type: "apply",
      target_id: 4, // `${targetId}`, // 알림을 받는 사람의 _id값 product?.item?.seller?._id
      channel: "toast",
      content: contentByType(
        "apply",
        JSON.parse(sessionData).state?.user?.name
      ), //contentByType(type, userName),
      extra: {
        url: "/errand/2", //`/errand/${errandId}`,
        errand_title: "SNS 프로필 사진 찍어주세요", //`${errandTitle}`, //product?.item?.name
      },
    };

    mutation.mutate(notificationData);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="bg-blue-500 text-white px-4 py-2"
    >
      Send Notification
    </button>
  );
}

// NotificationCreate.propTypes = {
//   type: PropTypes.oneOf(["apply", "comment", "expire", "complete", "accept"])
//     .isRequired,
//   targetId: PropTypes.number.isRequired,
//   errandId: PropTypes.number.isRequired,
//   errandTitle: PropTypes.string.isRequired,
// };
