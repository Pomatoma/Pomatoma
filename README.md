아래는 라이브러리 상세 설명입니다!

---

# Package.json 상세 분석 📦

## 🔍 기본 정보

```json
{
  "name": "pomatoma", // 프로젝트명 (뽀모도로 + 토마토?)
  "private": true, // npm 레지스트리에 공개하지 않음 (개인 프로젝트)
  "version": "0.0.0", // 초기 개발 버전
  "type": "module" // ES6 모듈 시스템 사용 (import/export)
}
```

## ⚡ 스크립트

```json
{
  "dev": "vite", // 개발 서버 실행
  "build": "vite build", // 프로덕션 빌드
  "lint": "eslint .", // 코드 품질 검사
  "preview": "vite preview", // 빌드된 결과물 미리보기
  "test": "vitest" // 테스트 실행
}
```

## 🚀 메인 의존성 (dependencies)

### ⚛️ React 생태계

```json
"react": "^19.1.0",                    // React 최신 버전
"react-dom": "^19.1.0",                // React DOM 렌더링
"react-router-dom": "^7.7.0"           // 클라이언트 사이드 라우팅
```

### 🎨 스타일링

```json
"@tailwindcss/vite": "^4.1.11",        // Vite용 TailwindCSS 플러그인
"tailwindcss": "^4.1.11"               // 유틸리티 기반 CSS 프레임워크
```

### 📡 상태 관리 & 데이터 페칭

```json
"zustand": "^5.0.6",                   // 가벼운 상태 관리 라이브러리
"@tanstack/react-query": "^5.83.0"     // 서버 상태 관리 (캐싱, 동기화)
```

### 📝 폼 관리

```json
"react-hook-form": "^7.61.0",          // 성능 최적화된 폼 라이브러리
"react-select": "^5.10.2"              // 고급 셀렉트 컴포넌트
```

### 🔔 UI/UX

```json
"react-hot-toast": "^2.5.2",           // 토스트 알림
"use-sound": "^5.0.0"                  // 사운드 재생 (뽀모도로 타이머 알림용)
```

### 🔥 Firebase & 보안

```json
"react-firebase-hooks": "^5.1.1",      // Firebase React 훅
"crypto-js": "^4.2.0"                  // 암호화 유틸리티
```

### 📅 유틸리티

```json
"date-fns": "^4.1.0"                   // 날짜 처리 라이브러리
```

## 🛠️ 개발 의존성 (devDependencies)

### 🔧 빌드 도구

```json
"vite": "^7.0.4",                      // 빠른 빌드 도구
"@vitejs/plugin-react": "^4.6.0"       // React용 Vite 플러그인
```

### 🧪 테스트 도구

```json
"vitest": "^3.2.4",                    // Vite 기반 테스트 러너
"@testing-library/react": "^16.3.0",   // React 컴포넌트 테스트
"@testing-library/jest-dom": "^6.6.3", // DOM 매처 확장
"@testing-library/user-event": "^14.6.1", // 사용자 이벤트 시뮬레이션
"jsdom": "^26.1.0"                     // 브라우저 환경 시뮬레이션
```

### 📏 코드 품질

```json
"eslint": "^9.30.1",                   // JavaScript 린터
"@eslint/js": "^9.30.1",               // ESLint 기본 설정
"eslint-plugin-react-hooks": "^5.2.0", // React Hooks 규칙
"eslint-plugin-react-refresh": "^0.4.20", // React Fast Refresh 지원
"globals": "^16.3.0"                   // 전역 변수 정의
```

### 📝 TypeScript 지원

```json
"@types/react": "^19.1.8",             // React 타입 정의
"@types/react-dom": "^19.1.6"          // React DOM 타입 정의
```

## 🎯 프로젝트 특징 분석

### ✅ 잘 구성된 점들

1. **최신 기술 스택**: React 19, Vite 7 등 최신 버전 사용
2. **완전한 테스트 환경**: Testing Library + Vitest로 튼튼한 테스트 설정
3. **개발 효율성**:
   - `zustand` (가벼운 상태 관리)
   - `react-hook-form` (고성능 폼)
   - `react-query` (서버 상태 관리)
4. **뽀모도로 앱에 특화**:
   - `use-sound` (타이머 알림음)
   - `date-fns` (시간 계산)
   - `react-hot-toast` (알림)

### 🔍 주목할 점들

- **Firebase 연동**: `react-firebase-hooks`로 인증/데이터베이스 사용 예정
- **보안 고려**: `crypto-js`로 클라이언트 암호화
- **접근성**: `react-select`로 사용자 친화적 UI

## 💡 실행 명령어

```bash
# 개발 서버 시작
npm run dev

# 테스트 실행
npm run test

# 코드 품질 검사
npm run lint

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```
