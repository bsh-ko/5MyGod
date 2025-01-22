import PropTypes from "prop-types";
import dayjs from "dayjs";

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default function CommentListItem({ item }) {
  const formattedCreatedAt = dayjs(
    item.createdAt,
    "YYYY.MM.DD HH:mm:ss"
  ).format("YYYY.MM.DD HH:mm");

  console.log("user name: ", item.user.name);

  return (
    <>
      <li className="list_item w-full min-h-[100px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[16px] flex flex-col gap-[12px]">
        <div className="comment_header flex items-center justify-between border-b-[1px] pb-[8px]">
          <div className="comment_profile_card flex gap-[12px] items-center text-small-text flex-shrink-0">
            <img
              src={`https://11.fesp.shop${item.user.image}`}
              alt={`${item.user.name} 프로필 이미지`}
              className="profile_image rounded-full w-[36px] h-[36px] border-primary-50 border-[1px] shrink-0"
            />
            <div className="flex-grow">{item.user.name}</div>
          </div>

          <div className="comment_date_and_time text-[12px] text-gray-400">
            {formattedCreatedAt}
          </div>
        </div>

        <pre className="comment_content font-pretendard text-small-text">
          {item.content}
        </pre>
      </li>
    </>
  );
}
