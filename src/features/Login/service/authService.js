// feature/Login/service/authService.js API 호출 추상화
import { registerUser, addUserFirestore, loginUser, checkUser, sendEmailtoResetPassword } from '../provider/authApiProvider';
import { useAuthStore } from '../../../store/useAuthStore';

export const signUp = async (userInfo) => {
  const { username, userid, password } = userInfo;
  useAuthStore.getState().setLoading(true);
  const result = await registerUser({ username, userid, password });
  useAuthStore.getState().setLoading(false);
  return result;
};

// 회원정보 realtime database에 저장
export const addUserStore = async (userInfo) => {
  useAuthStore.getState().setLoading(true);
  const result = await addUserFirestore(userInfo);
  useAuthStore.getState().setLoading(false);
  return result;
};

// 로그인 로직 호출
export const login = async (userInfo) => {
  const { userid, password } = userInfo;
  useAuthStore.getState().setLoading(true);
  const result = await loginUser({ userid, password });
  if(result.success === true) {
    useAuthStore.getState().setUserFromAuth(result.userInfo);
  }
  useAuthStore.getState().setLoading(false);
  return result;
}

// 비밀번호 찾기 로직
export const findPassword = async (userInfo) => {
  useAuthStore.getState().setLoading(true);
  // 회원 확인
  const user = await checkUser(userInfo);
  if(user.success === false) {
    useAuthStore.getState().setLoading(false);
    return {
      success: false,
      error: user.error,
    };
  } else {
    const result = await sendEmailtoResetPassword(userInfo.email);
    useAuthStore.getState().setLoading(false);
    return result;
  }
}