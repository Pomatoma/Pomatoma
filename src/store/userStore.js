import { create } from 'zustand';

const useUserStore = create((set) => ({
  userInfo: {
    userUid: '',
    username: '',
  },
  isAuthenticated: false, // 로그인 상태 관리
  isLoading: false, // 로딩 상태 관리
  setUser: (userInfo) => set({ userInfo, isAuthenticated: true }), // 로그인 성공 시 호출
  logout: () => set({ userInfo: {}, isAuthenticated: false }), // 로그아웃
  setLoading: (isLoading) => set({ isLoading }), // 로딩 상태 관리
}));

export { useUserStore };
