// feature/Login/service/authService.js API 호출
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { db, auth } from '../../../../config/firbaseConfig';

// 회원가입 로직 
export async function registerUser({ username, userid, password }) {

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userid, password);
    const user = userCredential.user;
    console.log('회원가입 성공:', user);
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('회원가입 실패:', error.message);
    if(error.message === 'auth/email-already-in-use') {
      return {
        success: false,
        error: '이미 존재하는 이메일입니다.',
      };
    }
  }
}

// 회원가입 성공 시 파이어 스토어에 저장
export async function addUserFirestore({ username, userUid }) {
  console.log('Firestore에 저장할 유저 정보:', userUid, username);
  console.log('DB 객체 확인:', db);
  
  try {
    const userRef = ref(db, 'users/' + userUid);
    console.log('생성된 참조:', userRef);
    
    const userData = {
      userUid,  
      username,
      createdAt: new Date().toISOString(),
    };
    console.log('저장할 데이터:', userData);
    
    //여기서부터 동작을 하지 않음
    await set(userRef, userData);
    console.log('회원가입 DB 저장 성공:', userUid);
    
    return {
      success: true,
      message: '회원가입 성공',
    };
  } catch (error) {
    console.error('회원가입 DB 저장 실패:', error);
    console.error('에러 코드:', error.code);
    console.error('에러 메시지:', error.message);
    
    return {
      success: false,
      error: error.message,
    };
  }
}

// 로그인 로직
export async function loginUser({ userid, password }) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userid, password);
    const user = userCredential.user;
    // console.log('로그인 성공:', user);
    return {
      success: true,
      user,
    };
  } catch (error) {
    // console.error('로그인 실패:', error);
    if(error.message === 'Firebase: Error (auth/invalid-credential).') {
      return {
        success: false,
        error: '이메일과 비밀번호를 다시 한 번 확인해주세요.',
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
} 

// 비밀번호 재설정 이메일 보내기 로직
export async function findPassword(email) {
  try {
    auth.languageCode = 'ko';
    const result = await sendPasswordResetEmail(auth, email)
    .then(() => {
      return {
        success: true,
        message: '비밀번호 재설정 이메일을 발송했습니다.<br/>이메일을 확인해주세요!',
      }
    }).catch((error) => {
      return {
        success: false,
        error: error.message,
      }
    })

    return result;
  } catch (error) {
    console.error('비밀번호 재설정 이메일 보내기 실패:', error);
    return {
      success: false,
      error: error.message,
    }
  }
}

