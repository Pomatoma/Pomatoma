import { describe, expect } from 'vitest';
import { auth } from '../../../../config/firbaseConfig';

describe('회원가입 진행 로직 테스트', () => {
  test('auth가 잘 불러와지는지 확인해야함', () => {
    expect(auth).toBeDefined();
  });
});
