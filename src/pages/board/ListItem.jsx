import TagList from "@pages/board/TagList";
import PropTypes from "prop-types";

ListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.string.isRequired,
    extra: PropTypes.shape({
      category: PropTypes.arrayOf(PropTypes.string).isRequired, // category는 문자열 배열로 전달되어야 함
      tags: PropTypes.arrayOf(PropTypes.string), // tag도 문자열 배열로 전달되어야 함
    }),
  }),
};

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
          <div className="font-pretendard text-card-timelimit">1시간 남음</div>
          <div className="font-pretendard text-card-price">15,000원</div>
        </div>
      </div>
    </li>
  );
}
