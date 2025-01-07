import { create } from "zustand";
// `persist` 미들웨어: 상태 정보를 메모리(새로고침하면 다 날아감)가 아닌 스토리지에 저장해주는 기능 - zustand에서 제공됨
import { persist, createJSONStorage } from "zustand/middleware";

// store 생성
// zustand 내부의 create 함수가 실행됨 -> UserStore가 호출됨 -> set, get, subscribe 함수 등을 생성하여 UserStore에 인자로 전달함 -> UserStore 내부에서 해당 함수들 사용하여 상태 업데이트 가능
const UserStore = (set) => ({
  user: null, // 초기 상태: 로그아웃 상태
  setUser: (user) => set({ user }), // 유저 정보를 설정하는 함수
  resetUser: () => set({ user: null }), // 유저 상태를 초기화(로그아웃)
});

// storage를 사용하지 않는 경우
// const useUserStore = create(UserStore);

// storage를 사용하는 경우
const useUserStore = create(
  persist(UserStore, {
    name: "user", // 저장소에 저장될 키 이름
    storage: createJSONStorage(() => sessionStorage), // 저장소로 sessionStorage를 사용
  })
);

export default useUserStore;
