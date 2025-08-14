// feature/Login/service/authService.js - Firebase 인증 서비스
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database';
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

// 회원가입 성공 시 realtime database에 저장
export async function addUserFirestore({ username, userUid, email }) {

  try {
    const userRef = ref(db, 'users/' + userUid);
    const userData = {
      userUid,  
      username,
      email,
      createdAt: new Date().toISOString(),
    };

    await set(userRef, userData);
  
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
      userInfo: {
        uid: user.uid,
        email: user.email,
      },
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

// 회원이 등록되어있는지 확인 로직
export async function checkUser({username, email}) {
  try {
    const userRef = ref(db, 'users');
    const userQuery = query(userRef, orderByChild('username'), equalTo(username));
    const snapshot = await get(userQuery); // .once('value') 대신 get() 사용하는 것이 더 최신 방식입니다.

    if(snapshot.exists()) {
      let foundUser = null;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        // console.log('회원 확인 결과 (username 일치):', userData);
        // 이메일 비교
        if (userData.email === email) {
          foundUser = userData;
        }
      });

      if (foundUser) {
        return {
          success: true,
          user: foundUser,
        };
      } else {
        return {
          success: false,
          error: '이메일이 일치하지 않습니다.',
        };
      }
    } else {
      return {
        success: false,
        error: '회원이 존재하지 않습니다.',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: '회원 확인 중 오류가 발생했습니다.', // 에러 메시지를 좀 더 명확하게
    };
  }
}


// 비밀번호 재설정 이메일 보내는 로직
export async function sendEmailtoResetPassword(email) {
  try {
    auth.languageCode = 'ko';
    const result = await sendPasswordResetEmail(auth, email)
    .then(() => {
      return {
        success: true,
        message: '비밀번호 재설정 이메일을 발송했습니다.\n이메일을 확인해주세요!',
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

