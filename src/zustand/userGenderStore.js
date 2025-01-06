import { create } from "zustand";

const userGenderStore = create((set) => ({
  gender: "male", // 초기 성별 상태
  setGender: (gender) => set({ gender }), // 성별 업데이트 함수
}));

export default userGenderStore;
