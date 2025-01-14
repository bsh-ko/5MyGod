import LikeButton from "@pages/pay/LikeButton";

export default function PaySuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="content-center flex flex-col items-center">
        <img src="/src/assets/success.png" className="mx-auto" />
        <p className="font-pretendard font-extrabold text-popup-title text-primary-500 text-center my-5">
          결제 완료
        </p>
        <p className="font-pretendard text-popup-text text-gray-700 text-center">
          20,000원을 결제했어요.
        </p>
        <p className="font-pretendard text-popup-text text-gray-700 text-center mt-32 mb-2">
          종로구뽀또그래퍼님의
          <br />
          심부름에 만족하셨다면
        </p>
        <LikeButton className="mx-auto" />
      </div>
    </div>
  );
}
