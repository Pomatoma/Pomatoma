import { create } from 'zustand';

const useUserStore = create((set) => ({
  userInfo: {
    id: '',
    name: '',
  },
  isAuthenticated: false, // 로그인 상태 관리
  setUser: (userInfo) => set({ userInfo, isAuthenticated: true }), // 로그인 성공 시 호출
  logout: () => set({ userInfo: {}, isAuthenticated: false }), // 로그아웃
}));

export { useUserStore };
