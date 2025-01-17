import LikeButton from "@pages/pay/LikeButton";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function PaySuccess() {
  const location = useLocation();
  const prodData = location.state;
  console.log(prodData);

  const matchedUserId = location.state?.extra?.matchedUserId;
  const payAmount = location.state?.price;

  const axios = useAxiosInstance();

  console.log("매칭된 유저 아이디 ", matchedUserId);

  const { data: userData } = useQuery({
    queryKey: ["users", matchedUserId],
    queryFn: () => axios.get(`/users/${matchedUserId}`),
    select: (res) => res.data.item,
    enabled: !!matchedUserId,
  });

  console.log("매칭된 유저 데이터 ", userData);

  // 결제 금액, 유저 닉네임 동적 구현 요구됨
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="content-center flex flex-col items-center">
        <img src="/src/assets/success.png" className="mx-auto" />
        <p className="font-pretendard font-extrabold text-popup-title text-primary-500 text-center my-5">
          결제 완료
        </p>
        <p className="font-pretendard text-popup-text text-gray-700 text-center">
          {payAmount?.toLocaleString()}원을 결제했어요.
        </p>
        <p className="font-pretendard text-popup-text text-gray-700 text-center mt-32 mb-2">
          {userData?.name}님의
          <br />
          심부름에 만족하셨다면
        </p>
        <LikeButton className="mx-auto" />
      </div>
    </div>
  );
}
