import { describe, expect, test, vi, beforeEach } from 'vitest';

// Firebase 모듈들을 모킹(mocking)하여 실제 Firebase 서비스 대신 가짜 함수들을 사용
// 이렇게 하면 테스트 시 실제 Firebase에 연결하지 않고도 테스트를 실행할 수 있음

// Firebase Auth 모듈 모킹
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(), // 회원가입 함수를 가짜 함수로 대체
  getAuth: vi.fn(() => ({})), // 인증 객체를 가짜 객체로 대체
}));

// Firebase Realtime Database 모듈 모킹
vi.mock('firebase/database', () => ({
  ref: vi.fn(), // 데이터베이스 참조 생성 함수를 가짜 함수로 대체
  set: vi.fn(), // 데이터 저장 함수를 가짜 함수로 대체
}));

// Firebase 설정 파일 모킹
vi.mock('../../../../config/firbaseConfig', () => ({
  db: {
    _checkNotDeleted: vi.fn(), // Firebase 내부 검증 함수를 가짜 함수로 대체
  },
  auth: {}, // 인증 객체를 빈 객체로 대체
}));

// 모킹 설정 후에 실제 함수들을 import
// 이 순서가 중요함: 모킹을 먼저 하고 import해야 함
import { signUp, addUserStore } from '../service/authService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

// 회원가입 관련 테스트 그룹
describe('회원가입 진행 로직 테스트', () => {
  // 각 테스트 실행 전에 모든 모킹을 초기화
  // 이렇게 하면 각 테스트가 독립적으로 실행됨
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 회원가입 성공 시나리오 테스트
  test('회원가입 성공 테스트', async () => {
    // 테스트용 가짜 사용자 데이터 설정
    const mockUser = { uid: 'test-uid', email: 'test@test.com' };
    
    // Firebase Auth 함수들이 성공적으로 동작하도록 모킹
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    set.mockResolvedValue(); // 데이터베이스 저장도 성공하도록 설정

    // 실제 회원가입 함수 호출
    const result = await signUp({
      username: '테스트',
      userid: 'test@test.com',
      password: '123456'
    });

    // 결과 검증: 성공 여부와 사용자 정보 확인
    expect(result.success).toBe(true);
    expect(result.user).toEqual(mockUser);
  });

  // 회원가입 실패 시나리오 테스트
  test('회원가입 실패 테스트', async () => {
    // Firebase Auth 함수가 에러를 발생시키도록 모킹
    createUserWithEmailAndPassword.mockRejectedValue(new Error('회원가입 실패'));

    // 실제 회원가입 함수 호출 (실패 예상)
    const result = await signUp({
      username: '테스트',
      userid: 'test@test.com',
      password: '123456'
    });

    // 결과 검증: 실패 여부와 에러 메시지 확인
    expect(result.success).toBe(false);
    expect(result.error).toBe('회원가입 실패');
  });

  // Firebase Realtime Database 저장 기능 테스트
  test('Firestore 저장 테스트', async () => {
    // 데이터베이스 참조를 위한 가짜 객체 생성
    const mockRef = { path: 'users/test-uid' };
    
    // ref 함수가 가짜 참조 객체를 반환하도록 모킹
    ref.mockReturnValue(mockRef);
    
    // set 함수가 성공적으로 완료되도록 모킹
    set.mockResolvedValue();

    // 테스트용 사용자 정보
    const userInfo = {
      username: 'test',
      userUid: 'test-uid',
    };
    
    // 실제 데이터베이스 저장 함수 호출
    // 함수가 에러 없이 실행되는지 확인
    await expect(addUserStore(userInfo)).resolves.not.toThrow();
    
    // Firebase 함수들이 올바르게 호출되었는지 검증
    
    // 1. ref 함수가 올바른 경로로 호출되었는지 확인
    // expect.anything()은 첫 번째 매개변수(db 객체)가 무엇이든 상관없다는 의미
    expect(ref).toHaveBeenCalledWith(expect.anything(), 'users/test-uid');
    
    // 2. set 함수가 올바른 참조와 데이터로 호출되었는지 확인
    expect(set).toHaveBeenCalledWith(mockRef, {
      userUid: 'test-uid',
      username: 'test',
    });
  });
});