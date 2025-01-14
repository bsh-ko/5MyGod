import { useEffect } from "react";

function Payment({ payId, payAmount }) {
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

  const handlePayment = () => {
    if (window.PortOne) {
      window.PortOne.requestPayment({
        storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
        paymentId: payId, //결제 ID - 심부름 고유값으로, testm5w7k로 시작하고 3자리 추가해주면 될것같습니다 ex. 1번 심부름은 testm5w7k001
        orderName: "테스트 결제",
        totalAmount: payAmount, //결제 금액
        currency: "KRW",
        channelKey: "channel-key-4ca6a942-3ee0-48fb-93ef-f4294b876d28",
        payMethod: "CARD",
        card: {},
        redirectUrl: "https://sdk-playground.portone.io/", //결제 후 이동할 url
      });
    } else {
      alert("결제 모듈이 로드되지 않았습니다.");
    }
  };

  return <button onClick={handlePayment}>결제하기</button>;
}

export default Payment;
