# Express로 REST API 만들기 — Node.js 백엔드 입문

퀴즈 API를 직접 만들며 배우는 Node.js 백엔드 입문 과정입니다.

## 사전 요구사항

- Node.js 20 이상
- npm 9 이상
- JavaScript 기초 문법 이해

## 기술 스택

- Express 4 (웹 프레임워크)
- better-sqlite3 (데이터베이스)
- jsonwebtoken (인증 토큰)
- bcryptjs (비밀번호 해싱)

## 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 샘플 데이터 삽입
npm run seed

# 개발 서버 실행 (자동 재시작)
npm run dev

# 또는 일반 실행
npm start
```

서버가 `http://localhost:4000` 에서 실행됩니다.

## API 엔드포인트

### 인증

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | /api/auth/register | 회원가입 |
| POST | /api/auth/login | 로그인 |

### 퀴즈

| 메서드 | 경로 | 설명 | 인증 |
|--------|------|------|------|
| GET | /api/quizzes | 퀴즈 목록 조회 | ❌ |
| GET | /api/quizzes/:id | 퀴즈 상세 조회 | ❌ |
| POST | /api/quizzes/:id/submit | 답안 제출 | ✅ |

## 프로젝트 구조

```
src/
├── index.js              # 앱 진입점
├── database.js           # SQLite 초기화
├── seed.js               # 샘플 데이터
├── middleware/
│   ├── auth.js           # JWT 인증 미들웨어
│   └── errorHandler.js   # 에러 처리 미들웨어
├── routes/
│   ├── auth.js           # 인증 라우트
│   └── quiz.js           # 퀴즈 라우트
├── controllers/
│   ├── authController.js # 인증 컨트롤러
│   └── quizController.js # 퀴즈 컨트롤러
└── services/
    ├── userService.js    # 사용자 DB 쿼리
    └── quizService.js    # 퀴즈 DB 쿼리
```

## 수업 구성

1. Node.js와 npm 소개
2. Express 기초 — 첫 서버 만들기
3. 라우팅과 요청/응답
4. 미들웨어 이해하기
5. JSON과 REST API 설계
6. 에러 처리
7. 데이터 검증
8. 컨트롤러/서비스 패턴으로 리팩터링
9. SQLite 데이터베이스 연동
10. JWT 인증 구현
