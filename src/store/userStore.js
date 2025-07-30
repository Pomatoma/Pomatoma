import { create } from 'zustand';
import { Authenticated } from '../features/Login/provider/authApiProvider';

const useUserStore = create((set) => ({
  // user: {},
  userInfo: {
    id: '',
    name: '',
  },
  isAuthenticated: false,
  addUser: async (userInfo) => {
    //회원가입 프로바이더 호출
    const resp = await Authenticated(userInfo);
    console.log('Store에서 응답받은 내용: ', resp);
    return resp.message;
  },
  login: (userInfo) => set({ userInfo, isAuthenticated: true }),
  logout: () => set({ userInfo: {}, isAuthenticated: false }), // 로그아웃
}));

export { useUserStore };
