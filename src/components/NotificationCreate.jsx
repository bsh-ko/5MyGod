import { useNotification } from "@contexts/NotificationProvider";
import { useNotificationContent } from "@hooks/useNotificationContent";

// 알람을 위한 데이터로 가공 후 전송
const createNotificationData = ({
  type,
  targetId,
  errandId,
  errandTitle,
  createNotification,
  contentByType,
}) => {
  const sessionData = sessionStorage.getItem("user");
  const userName = JSON.parse(sessionData)?.state?.user?.name;

  const notificationData = {
    type: type,
    target_id: Number(targetId),
    channel: "toast",
    content: contentByType(type, userName),
    extra: {
      url: `/errand/${Number(errandId)}`,
      errand_title: errandTitle,
    },
  };

  // 전송
  try {
    createNotification(notificationData);
  } catch (error) {
    console.error("알림 생성 실패:", error);
  }
};

// 불러온 데이터를 가공하도록 createNotificationData 호출
export const useNotificationHandler = () => {
  // NotificationProvider에서 알림 생성 함수 가져오기
  const { createNotification } = useNotification();
  const { contentByType } = useNotificationContent();

  return ({ type, targetId, errandId, errandTitle }) => {
    createNotificationData({
      type,
      targetId,
      errandId,
      errandTitle,
      createNotification,
      contentByType,
    });
  };
};

export default useNotificationHandler;

// export const useNotificationCreate = () => {
//   const { createNotification } = useNotification();
//   const { contentByType } = useNotificationContent();

//   const handleNotification = ({ type, targetId, errandId, errandTitle }) => {
//     const sessionData = sessionStorage.getItem("user");
//     const userName = JSON.parse(sessionData)?.state?.user?.name;

//     const notificationData = {
//       type: type,
//       target_id: Number(targetId),
//       channel: "toast",
//       content: contentByType(type, userName),
//       extra: {
//         url: `/errand/${Number(errandId)}`,
//         errand_title: errandTitle,
//       },
//     };

//     try {
//       createNotification(notificationData);
//     } catch (error) {
//       console.error("알림 생성 실패:", error);
//     }
//   };

//   return handleNotification;
// };

// return (
//   <button
//     onClick={handleButtonClick}
//     className="bg-blue-500 text-white px-4 py-2"
//   >
//     Send Notification
//   </button>
// );
//};

// NotificationCreate.propTypes = {
//   type: PropTypes.oneOf(["apply", "comment", "expire", "complete", "accept"])
//     .isRequired,
//   targetId: PropTypes.string.isRequired,
//   errandId: PropTypes.string.isRequired,
//   errandTitle: PropTypes.string.isRequired,
// };
