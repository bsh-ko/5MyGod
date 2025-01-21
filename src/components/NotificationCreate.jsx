import { useNotification } from "@contexts/NotificationProvider";
import { useNotificationContent } from "@hooks/useNotificationContent";
import PropTypes from "prop-types";

export default function NotificationCreate({
  type,
  targetId,
  errandId,
  errandTitle,
}) {
  const { createNotification } = useNotification();
  const { contentByType } = useNotificationContent();

  const handleButtonClick = () => {
    const sessionData = sessionStorage.getItem("user");
    const userName = JSON.parse(sessionData)?.state?.user?.name;

    // 동적 구현 예정된 내용
    const notificationData = {
      type: "apply",
      target_id: 4, // `${targetId}`, // 알림을 받는 사람의 _id값 product?.item?.seller?._id
      channel: "toast",
      content: contentByType("apply", userName), //contentByType(type, userName),
      extra: {
        url: "/errand/2", //`/errand/${errandId}`,
        errand_title: "SNS 프로필 사진 찍어주세요", //`${errandTitle}`, //product?.item?.name
      },
    };

    createNotification(notificationData);
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

NotificationCreate.propTypes = {
  type: PropTypes.oneOf(["apply", "comment", "expire", "complete", "accept"])
    .isRequired,
  targetId: PropTypes.number.isRequired,
  errandId: PropTypes.number.isRequired,
  errandTitle: PropTypes.string.isRequired,
};
