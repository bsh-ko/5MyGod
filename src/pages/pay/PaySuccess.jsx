import LikeButton from "@pages/pay/LikeButton";

export default function PaySuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <img src="/src/assets/x-icon.png" /> */}
      <div className="content-center">
        <img src="/src/assets/success.png" />
        <p className="font-pretendard font-extrabold text-popup-title text-primary-500 text-center">
          결제 완료
        </p>
        <p className="font-pretendard text-popup-text text-gray-700 text-center">
          20,000원을 결제했어요.
        </p>
        <p className="font-pretendard text-popup-text text-gray-700 text-center">
          종로구뽀또그래퍼님의
          <br />
          심부름에 만족하셨다면
        </p>
        <LikeButton />
      </div>
    </div>
  );
}
