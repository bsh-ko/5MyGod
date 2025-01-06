import LocationMap from "@components/LocationMap";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Detail() {
  const axios = useAxiosInstance();
  const { _id } = useParams();
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["products", _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: (res) => res.data,
  });

  console.log("article data: ", data);

  let genderImage;

  if (data?.item?.seller?.extra?.gender === "male") {
    genderImage = `/assets/male.png`;
  } else if (data?.item?.seller?.extra?.gender === "female") {
    genderImage = `/assets/female.png`;
  } else {
    genderImage = `/assets/unchecked.png`;
  }

  // 마감 일시를 동적으로 담는 변수
  let dueDateDisplay;
  if (data?.item?.extra?.due) {
    const due = data.item.extra.due;
    const date = new Date(due);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedTime = `${date.getHours()}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    dueDateDisplay = (
      <div>
        <span className="text-primary-700">{month}</span>월{" "}
        <span className="text-primary-700">{day}</span>일{" "}
        <span className="text-primary-700">{formattedTime}</span> 까지
      </div>
    );
  }

  // 위치 정보
  const pickupLocation = data?.item?.extra?.pickupLocation;
  const arrivalLocation = data?.item?.extra?.arrivalLocation;

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-scroll">
      <div className="post bg-[#fff] p-[22px] rounded-lg shadow-card-shadow grow">
        <div className="post_header border-b-[1px] border-gray-400 pb-[20px] flex flex-col gap-[20px]">
          <div className="post_title font-laundry text-detail-title break-all flex gap-[12px] items-center">
            <h1>{data.item.name}</h1>
          </div>

          {/* 작성자 프로필 */}
          <div className="profile_card flex gap-[12px] items-center text-small-text">
            <img
              src={`https://11.fesp.shop${data.item.seller.image}`}
              className="profile_image rounded-full w-[36px] h-[36px] border-[1px] bg-gray-100 bg-cover bg-center shrink-0"
            />

            <div className="nickname">{data.item.seller.name}</div>

            <img
              className="gender w-[24px] h-[24px] shrink-0"
              src={`${genderImage}`}
            />

            {/* <div className="like_number shrink-0 flex gap-[2px] items-center">
              <img src="/assets/thumb.png" className="w-[24px] h-[24px]" />
              {data.item.seller.extra.likes}
            </div> */}
          </div>
        </div>

        <div className="post_body pt-[20px] flex flex-col gap-[16px] font-pretendard text-regular-text">
          {/* 심부름 내용 */}
          <div className="post_detail">
            <p className="whitespace-pre-line">{data.item.content}</p>
          </div>

          {/* 심부름 정보 블록*/}
          <div className="post_info flex flex-col gap-[12px]">
            {/* 시간 */}
            <div className="post_time flex gap-[8px] items-center">
              <img src="/assets/redwatch.png" className="w-[20px] h-[20px]" />
              {dueDateDisplay}
            </div>

            {/* 금액 */}
            <div className="post_price flex gap-[8px] items-center">
              <img src="/assets/moneypouch.png" className="w-[20px] h-[20px]" />
              <p>
                <span className="text-primary-700">
                  {`${new Intl.NumberFormat().format(data.item.price)} `}
                </span>
                원
              </p>
            </div>

            {/* 위치(지도) */}
            <div className="post_location flex flex-col gap-[16px]">
              {/* 픽업 위치 */}
              <div className="flex items-center gap-[8px]">
                <img src="/assets/pin.png" className="w-[20px] h-[20px]" />
                <p className="flex-grow">픽업 위치</p>
              </div>

              <div className="post_map w-full rounded-lg shadow-card-shadow p-[12px] border-[1px]">
                {pickupLocation?.coordinates ? (
                  <>
                    {pickupLocation?.coordinates && (
                      <LocationMap
                        title="픽업 위치"
                        coordinates={pickupLocation.coordinates}
                      />
                    )}

                    <div className="post_address p-[8px] pb-0 text-small-text flex flex-col gap-[4px]">
                      <div className="address_main flex gap-[4px]">
                        <span className="text-small-text text-primary-700">
                          기본 주소:{"  "}
                        </span>
                        <p className="text-small-text">
                          {pickupLocation.address}
                        </p>
                      </div>
                      <div className="address_main flex gap-[4px]">
                        <span className="text-small-text text-primary-700">
                          상세 주소:{"  "}
                        </span>
                        <p className="text-small-text">
                          {pickupLocation.detailAddress}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="message_nomap flex justify-center   rounded-lg p-[8px] text-gray-700">
                      픽업이 필요 없어요
                    </div>
                  </>
                )}
              </div>

              {/* 도착 위치 */}
              <div className="flex items-center gap-[8px]">
                <img src="/assets/pin.png" className="w-[20px] h-[20px]" />
                <p className="flex-grow">도착 위치</p>
              </div>

              <div className="post_map w-full rounded-lg shadow-card-shadow p-[12px] border-[1px]">
                {arrivalLocation?.coordinates ? (
                  <>
                    {arrivalLocation?.coordinates && (
                      <LocationMap
                        title="도착 위치"
                        coordinates={arrivalLocation.coordinates}
                      />
                    )}
                    <div className="post_address p-[8px] pb-0 text-small-text flex flex-col gap-[4px]">
                      <div className="address_main flex gap-[4px]">
                        <span className="text-small-text text-primary-700">
                          기본 주소:{"  "}
                        </span>
                        <p className="text-small-text">
                          {arrivalLocation.address}
                        </p>
                      </div>
                      <div className="address_main flex gap-[4px]">
                        <span className="text-small-text text-primary-700">
                          상세 주소:{"  "}
                        </span>
                        <p className="text-small-text">
                          {arrivalLocation.detailAddress}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="message_nomap flex justify-center rounded-lg p-[8px] text-gray-700">
                    도착 위치 정보가 없어요
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="comments bg-[#fff] p-[22px] rounded-lg shadow-card-shadow flex flex-col gap-[20px]">
        <h2 className="font-laundry text-[16px] text-gray-700">댓글 목록</h2>

        <ul className="list flex flex-col items-center gap-[24px]">
          <li className="list_item w-full min-h-[100px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[16px] flex flex-col gap-[12px]">
            <div className="comment_profile_card flex gap-[12px] items-center text-small-text flex-shrink-0">
              <img
                src="/assets/genie.png"
                className="profile_image rounded-full w-[36px] h-[36px] border-[1px] bg-gray-100 shrink-0"
              />
              <div className="flex-grow">닉네임입니다 닉네임입니다</div>
            </div>
            <div className="comment_content font-pretendard text-small-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
              placeat, modi maxime assumenda pariatur porro quas sapiente
              commodi quasi eligendi, molestiae quam doloremque. Nemo nam qui
              eius facere fugiat delectus?
            </div>
          </li>

          <li className="list_item w-full min-h-[100px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[16px] flex flex-col gap-[12px]">
            <div className="comment_profile_card flex gap-[12px] items-center text-small-text flex-shrink-0">
              <img
                src="/assets/genie.png"
                className="profile_image rounded-full w-[36px] h-[36px] border-[1px] bg-gray-100 shrink-0"
              />
              <div className="flex-grow">닉네임입니다 닉네임입니다</div>
            </div>
            <div className="comment_content font-pretendard text-small-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
              placeat, modi maxime assumenda pariatur porro quas sapiente
              commodi quasi eligendi, molestiae quam doloremque. Nemo nam qui
              eius facere fugiat delectus?
            </div>
          </li>
        </ul>

        <form className="comment-form flex gap-[12px] items-center">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            className="comment-input flex-grow border border-gray-400 rounded-lg p-[10px] text-regular-text"
          />
          <button
            type="submit"
            className="submit-btn bg-primary-500 text-white rounded-lg p-[10px] font-bold font-laundry min-w-[48px] flex-shrink-0"
          >
            제출
          </button>
        </form>
      </div>
    </main>
  );
}
