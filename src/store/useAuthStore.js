import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userInfo: null,
  isAuthenticated: false,
  setUserFromAuth: (firebaseUser) => {
    if(firebaseUser) {
      set({
        userInfo: {
          userUid: firebaseUser.uid,
          email: firebaseUser.email,
        },
        isAuthenticated: true,
      });
    } else {
      set({userInfo: null, isAuthenticated: false});
    }
  },
  isLoading: false, // 로딩 상태 관리
  setUser: (userInfo) => set({ userInfo, isAuthenticated: true }), // 로그인 성공 시 호출
  logout: () => set({ userInfo: {}, isAuthenticated: false }), // 로그아웃
  setLoading: (isLoading) => set({ isLoading }), // 로딩 상태 관리
}));