/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'], // Pretendard 폰트 추가
      },
      boxShadow: {
        inset: "inset 0 0 10px",
      },
    },
  },
  plugins: [],
};

