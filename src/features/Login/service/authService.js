// feature/Login/service/authService.js API 호출 추상화
import { registerUser, addUserFirestore, loginUser } from '../provider/authApiProvider';
import { useUserStore } from '../../../store/userStore';

export const signUp = async (userInfo) => {
  const { username, userid, password } = userInfo;
  useUserStore.getState().setLoading(true);
  const result = await registerUser({ username, userid, password });
  useUserStore.getState().setLoading(false);
  return result;
};

// 회원정보 realtime database에 저장
export const addUserStore = async (userInfo) => {
  useUserStore.getState().setLoading(true);
  const result = await addUserFirestore(userInfo);
  useUserStore.getState().setLoading(false);
  return result;
};

// 로그인 로직 호출
export const login = async (userInfo) => {
  const { userid, password } = userInfo;
  useUserStore.getState().setLoading(true);
  const result = await loginUser({ userid, password });
  if(result.success === true) {
    useUserStore.getState().setUser(result.user);
  }
  useUserStore.getState().setLoading(false);
  return result;
}