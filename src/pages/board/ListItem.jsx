import TagList from "@pages/board/TagList";
import PropTypes from "prop-types";
import dayjs from "dayjs";

ListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.string.isRequired,
    extra: PropTypes.shape({
      category: PropTypes.arrayOf(PropTypes.string).isRequired, // category는 문자열 배열로 전달되어야 함
      tags: PropTypes.arrayOf(PropTypes.string), // tag도 문자열 배열로 전달되어야 함
      due: PropTypes.string.isRequired,
    }),
  }),
};

// 남은 시간 계산하는 헬퍼 함수
// function calculateRemainingTime(due) {
//   const now = moment(); // 현재 시각
//   const dueTime = moment(due, "YYYY.MM.DD HH:mm:ss"); // 마감일시를 moment 객체로 변환
//   const diff = dueTime.diff(now); // 남은 시간 (밀리초 단위)

//   if (diff <= 0) {
//     return "마감";
//   }

//   // 남은 시간 계산
//   const duration = moment.duration(diff); // moment의 duration 사용
//   const days = Math.floor(duration.asDays()); // 남은 일수
//   const hours = duration.hours(); // 남은 시간
//   const minutes = duration.minutes(); // 남은 분

//   // 남은 시간에 따라 다른 텍스트 반환
//   if (days > 0) {
//     // 1일 이상 남았을 때
//     return `${days}일 남음`;
//   } else if (hours > 0) {
//     // 1일 미만, 시간 단위로 남았을 때
//     return `${hours}시간 남음`;
//   } else if (minutes > 0) {
//     // 1시간 미만으로 남았을 때
//     return "곧 마감";
//   }
// }
function calculateRemainingTime(due) {
  const now = dayjs(); // 현재 시각
  const dueTime = dayjs(due, "YYYY.MM.DD HH:mm:ss"); // 마감일시를 dayjs 객체로 변환
  const diff = dueTime.diff(now, "millisecond"); // 남은 시간 (밀리초 단위)

  if (diff <= 0) {
    return "마감";
  }

  // 남은 시간 계산
  const duration = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)), // 남은 일수
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // 남은 시간
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), // 남은 분
  };

  if (duration.days > 0) {
    return `${duration.days}일 남음`;
  } else if (duration.hours > 0) {
    return `${duration.hours}시간 남음`;
  } else if (duration.minutes > 0) {
    return "곧 마감";
  }
}

export default function ListItem({ item }) {
  // category에 따라 이미지 경로 매핑
  const categoryImages = {
    PC01: "/assets/bike.svg",
    PC02: "/assets/thumb.svg",
    PC03: "/assets/star.svg",
    PC04: "/assets/genie.svg",
    PC05: "/assets/twohearts.svg",
  };

  // category의 첫번째 값을 기반으로 이미지 경로 설정
  const categoryImage =
    categoryImages[item.extra?.category[0]] || "/assets/check.svg"; // category 설정이 안 된 경우 기본 이미지로 체크이미지 표시

  // 남은 시간
  const remainingTime = calculateRemainingTime(item.extra?.due);

  return (
    <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
      <img
        src={categoryImage}
        alt="게시글 대표이미지"
        className="flex-shrink-0 w-[40px] h-[40px]"
      />

      <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
        <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
          {item.name}
        </h2>

        {/* <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
          <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-[#FCFFD8] font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
            <img
              src="../../assets/watch.svg"
              alt="태그 이미지"
              className="tag_image w-[18px] h-[18px]"
            />
            시간이 생명
          </li>

          <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-[#FFD8E0] font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
            <img
              src="../../assets/siren.svg"
              alt="태그 이미지"
              className="tag_image w-[18px] h-[18px]"
            />
            <p className="tag_text font-pretendard text-[16px] max-w-full">
              도와주세요
            </p>
          </li>
        </ul> */}

        <TagList tags={item.extra?.tags} />

        <div className="li_info flex flex-grow justify-between">
          <div className="font-pretendard text-card-timelimit">
            {remainingTime}
          </div>
          <div className="font-pretendard text-card-price">{item.price} 원</div>
        </div>
      </div>
    </li>
  );
}
