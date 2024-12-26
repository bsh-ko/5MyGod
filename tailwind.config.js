/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      boxShadow: {
        // 레이아웃 짤 때 경계선 보기 위해 사용. shadow-inset 으로 사용
        inset: "inset 0 0 10px",
      },

      fontFamily: {
        laundry: ["TTLaundryGothicB", "sans-serif"], // font-laundry 로 사용
        pretendard: ["Pretendard-Regular", "sans-serif"], // font-pretendard 로 사용
      },

      fontSize: {
        // text-card-title 과 같이 사용

        "card-title": [
          "20px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "400" },
        ],
        "card-price": [
          "16px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "700" },
        ],
        "card-timelimit": [
          "16px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "500" },
        ],
        "detail-title": [
          "24px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "400" },
        ],
        "input-title": [
          "20px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "400" },
        ],
        "input-defaultValue": [
          "18px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "700" },
        ],
        "button-text": [
          "18px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "600" },
        ],
        "toggle-text": [
          "16px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "400" },
        ],
        "header-page-title": [
          "24px",
          { lineHeight: "auto", letterSpacing: "-0.08em", fontWeight: "400" },
        ],
        "detail-price": [
          "18px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "800" },
        ],
        "regular-text": [
          "18px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "500" },
        ],
        "small-text": [
          "16px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "500" },
        ],
        "detail-tag": [
          "14px",
          { lineHeight: "auto", letterSpacing: "-0.06em", fontWeight: "700" },
        ],
      },

      colors: {
        // bg-background-color 로 사용
        "background-color": "#F5F9FF",

        // 사용 예시
        // 배경색으로 사용: bg-primary-50
        // 텍스트 색상으로 사용: text-triadic-red-300
        // 테두리 색상으로 사용: border border-purple-500
        // 호버 상태로 사용: hover:bg-gray-200

        primary: {
          50: "#EAEAFD",
          100: "#CACAF9",
          200: "#A6A7F6",
          300: "#8084F2",
          400: "#6366EE",
          500: "#4849E8",
          600: "#433FDC",
          700: "#3A33D0",
          800: "#3226C4",
          900: "#2300B3",
        },
        complementary: {
          50: "#FBFCE5",
          100: "#F6F7C0",
          200: "#F1F195",
          300: "#EBEC6A",
          400: "#E8E848",
          500: "#E4E31E",
          600: "#E5D114",
          700: "#E5BA00",
          800: "#E5A200",
          900: "#E37900",
        },
        "triadic-red": {
          50: "#FEEAED",
          100: "#FEEAED",
          200: "#EB9495",
          300: "#DF6B6C",
          400: "#E84848",
          500: "#E84848",
          600: "#DD292C",
          700: "#CB1E26",
          800: "#BE151F",
          900: "#AF0113",
        },
        gray: {
          50: "#F9F9F9",
          100: "#F4F4F4",
          200: "#ECECEC",
          300: "#DDDDDD",
          400: "#B9B9B9",
          500: "#9A9A9A",
          600: "#717171",
          700: "#5D5D5D",
          800: "#3F3F3F",
          "black-900": "#1E1E1E",
        },
        purple: {
          50: "#E8F1FF",
          100: "#CADAFF",
          200: "#ABC4FF",
          300: "#92ADFB",
          400: "#869BF7",
          500: "#8289F1",
          600: "#7E7BE1",
          700: "#7668CB",
          800: "#6F57B7",
          900: "#633594",
        },
        mint: "#3ECFDD",
        kakao: "#FDE500",
      },
    },
  },
  plugins: [],
};
