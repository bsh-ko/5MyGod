import LocationMap from "@components/LocationMap";
import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentList from "@pages/board/CommentList";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail() {
  const axios = useAxiosInstance();
  const { _id } = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();

  // 상품(심부름) 데이터 가져오기
  const { data } = useQuery({
    queryKey: ["products", _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: (res) => res.data,
  });
  console.log("심부름 데이터: ", data);

  // 회원 성별에 따라 이미지 매핑
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

  // 지원하기 함수
  const apply = useMutation({
    mutationFn: (_id) => {
      const body = {
        products: [
          {
            _id: Number(_id),
            quantity: 1,
          },
        ],
      };
      return axios.post(`/orders/`, body);
    },

    onSuccess: () => {
      alert("심부름 지원이 완료되었습니다.");
      navigate(`/`); // 나의 지원 목록으로 이동하는 경로 추가 필요
    },
    onError: (err) => {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    },
  });

  // 내가 올린 심부름인지 아닌지 여부
  console.log("유저 데이터: ", user);
  const isMyErrand = data?.item?.seller_id === user?._id;
  // 심부름의 상태
  const errandState = data?.item?.extra?.productState[0];

  // 심부름 구분과 상태에 따라 달라지는 버튼의 문구와 동작 정의
  const defineDynamicButton = () => {
    if (!data || !data.item || !data.item.extra) return {};

    if (isMyErrand && errandState === "PS010") {
      // 내가 요청한 && 구인 중
      return {
        text: `지원자 n명 확인하기`,
        // navigate 지원자목록페이지 경로 추가 필요
        action: () => {
          navigate(`/errand/applicants/${_id}`);
        },
      };
    } else if (isMyErrand && errandState === "PS020") {
      // 내가 요청한 && 진행 중
      return {
        text: `심부름 완료 및 결제하기`,
        // 심부름 상태 PS030으로 바꾸는 동작 추가 필요
        // navigate 결제페이지 경로 추가 필요
        action: () => {
          navigate(`/`);
        },
      };
    } else if (!isMyErrand && errandState === "PS010") {
      // 남이 요청한 && 구인 중
      return {
        text: "지원하기",
        // 지원하기(Post) 동작
        action: () => {
          apply.mutate(_id);
        },
      };
    } else if (!isMyErrand && errandState === "PS020") {
      // 남이 요청한 && 진행 중
      return {
        text: "진행 중인 심부름",
        action: () => {},
      };
    } else if (errandState === "PS030") {
      // 완료된
      return {
        text: "이미 완료된 심부름",
        action: () => {},
      };
    } else if (errandState === "PS040") {
      // 기한 만료된
      return {
        text: "기한이 지난 심부름",
        action: () => {},
      };
    }
  };

  const { text, action } = defineDynamicButton();

  // isMyErrand && data?.item?.extra?.productState[0] === PS010 (내가 요청한 && 구인 중)
  // 버튼 문구: '지원자 n명 확인하기'
  // 버튼 동작: 지원자 목록 페이지로 이동

  // isMyErrand && data?.item?.extra?.productState[0] === PS020 (내가 요청한 && 진행 중)
  // 버튼 문구: '심부름 완료하기'
  // 버튼 동작: 심부름 상태를 PS030으로 변경, 결제 페이지로 이동

  // !isMyErrand && data?.item?.extra?.productState[0] === PS010 (남이 요청한 && 구인 중)
  // 버튼 문구: '지원하기'
  // 버튼 동작: 지원자 게시판에 글 작성

  // !isMyErrand && data?.item?.extra?.productState[0] === PS020 (남이 요청한 && 진행 중)
  // 버튼 문구: '이미 진행 중이에요'
  // 버튼 동작:

  // data?.item?.extra?.poructState[0] === PS030 (완료된 심부름)
  // 버튼 문구: '완료된 심부름이에요'
  // 버튼 동작:

  // data?.item?.extra?.poructState[0] === PS040 (기한 만료된 심부름)
  // 버튼 문구: '기한이 지났어요'
  // 버튼 동작:

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] relative">
      <div className="post bg-[#fff] p-[22px] rounded-lg shadow-card-shadow grow">
        <div className="post_header border-b-[1px] border-gray-400 pb-[20px] flex flex-col gap-[20px]">
          <div className="post_title font-laundry text-detail-title break-all flex gap-[12px] items-center">
            <h1>{data.item.name}</h1>
          </div>

          {/* 작성자 프로필 */}
          <div className="profile_card flex gap-[12px] items-center text-small-text">
            <img
              src={`https://11.fesp.shop${data.item.seller.image}`}
              className="profile_image rounded-full w-[36px] h-[36px] border-primary-50 border-[1px] bg-cover bg-center shrink-0"
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

      <CommentList />
      <div className="pb-40 bg-background-color"></div>

      <button
        type="button"
        onClick={action}
        className="bg-primary-500 font-laundry text-card-title text-2xl text-white p-[20px] rounded-t-lg absolute bottom-0 left-0 w-full"
      >
        {text}
      </button>
    </main>
  );
}
