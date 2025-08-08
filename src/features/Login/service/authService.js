// feature/Login/service/authService.js API 호출 추상화
import { registerUser, addUserFirestore, loginUser, checkUser, sendEmailtoResetPassword } from '../provider/authApiProvider';
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

// 비밀번호 찾기 로직
export const findPassword = async (userInfo) => {
  // 회원 확인
  const user = await checkUser(userInfo);
  
  if(user.success === false) {
    return {
      success: false,
      error: user.error,
    };
  } else {
    console.log('비밀번호 찾기 로직 호출', userInfo.email);
    const result = await sendEmailtoResetPassword(userInfo.email);
    console.log('비밀번호 찾기 결과 (service)', result);
    return result;
  }
}