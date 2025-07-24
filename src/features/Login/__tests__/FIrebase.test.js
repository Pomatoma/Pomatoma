// firebase.test.js
import { describe, test, expect, beforeAll } from 'vitest';
import { app, analytics } from '../../../../config/firbaseConfig';

describe('Firebase 연결 테스트', () => {
  test('Firebase 앱이 정상적으로 초기화되어야 함', () => {
    expect(app).toBeDefined();
    expect(app.name).toBe('[DEFAULT]');
    expect(app.options.projectId).toBeDefined();
  });

  test('Analytics가 정상적으로 초기화되어야 함', () => {
    expect(analytics).toBeDefined();
    expect(analytics.app).toBe(app);
  });

  test('Firebase 설정값이 유효해야 함', () => {
    const config = app.options;
    expect(config.apiKey).toBeDefined();
    expect(config.authDomain).toBeDefined();
    expect(config.projectId).toBeDefined();
    expect(config.storageBucket).toBeDefined();
    expect(config.messagingSenderId).toBeDefined();
    expect(config.appId).toBeDefined();
  });
});
