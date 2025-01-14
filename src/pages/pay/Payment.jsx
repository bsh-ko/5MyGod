import { useEffect } from "react";

function Payment({ payamount }) {
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
        paymentId: "testm5w64bli",
        orderName: "테스트 결제",
        totalAmount: payamount,
        currency: "KRW",
        channelKey: "channel-key-4ca6a942-3ee0-48fb-93ef-f4294b876d28",
        payMethod: "CARD",
        card: {},
        redirectUrl: "https://sdk-playground.portone.io/",
      });
    } else {
      alert("결제 모듈이 로드되지 않았습니다.");
    }
  };

  return <button onClick={handlePayment}>결제하기</button>;
}

export default Payment;
