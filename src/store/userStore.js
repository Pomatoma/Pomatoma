import { create } from 'zustand';

const useUserStore = create((set) => ({
  // user: {},
  userInfo: {
    id: '',
    name: '',
  },
  isAuthenticated: false,
  addUser: (userInfo) => set({ userInfo, isAuthenticated: true }),
  login: (userInfo) => set({ userInfo, isAuthenticated: true }),
  logout: () => set({ userInfo: {}, isAuthenticated: false }), // 로그아웃
}));

export { useUserStore };
