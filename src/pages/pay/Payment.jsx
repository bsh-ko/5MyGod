import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment({ productId, payAmount }) {
  useEffect(() => {
    const loadPortOneSDK = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.portone.io/v2/browser-sdk.js";
      script.async = true;

      script.onload = () => {
        console.log("PortOne SDK 로드 완료");
      };

      script.onerror = () => {
        console.error("PortOne SDK 로드 실패");
      };

      document.body.appendChild(script);
    };

    loadPortOneSDK();
  }, []);

  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      if (window.PortOne) {
        const result = await window.PortOne.requestPayment({
          storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
          paymentId: productId, //결제 ID - 심부름 고유값으로, testm5w7k로 시작하고 3자리 추가해주면 될것같습니다 ex. 1번 심부름은 testm5w7k001
          orderName: "테스트 결제",
          totalAmount: payAmount, //결제 금액
          currency: "KRW",
          channelKey: "channel-key-4ca6a942-3ee0-48fb-93ef-f4294b876d28",
          payMethod: "CARD",
          card: {},
          redirectUrl: "http://localhost:5173/pay/paysuccess", //결제 성공 후 이동할 url
        });
        console.log("결제 완료되었습니다.", result);
        navigate("/pay/paysuccess");
      } else {
        alert("결제 모듈이 로드되지 않았습니다.");
      }
    } catch (error) {
      //사용자가 결제 모듈을 취소했을 때
      console.log("결제를 취소했습니다.", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-[393px] h-16 bg-primary-500 text-white font-laundry font-bold tracking-tighter text-[24px]"
    >
      {payAmount}원 결제하기
    </button>
  );
}

export default Payment;
