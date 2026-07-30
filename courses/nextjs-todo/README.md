# SSR과 풀스택 앱 — Next.js 실전

Next.js 15 App Router를 사용한 풀스택 Todo 애플리케이션입니다.
서버 컴포넌트, 서버 액션, Prisma ORM, NextAuth.js v5 인증을 실습합니다.

## 사전 요구 사항

- Node.js 20+
- npm
- GitHub OAuth App (인증용)

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일을 편집하여 GitHub OAuth 자격 증명을 입력합니다

# 3. 데이터베이스 마이그레이션
npx prisma migrate dev --name init

# 4. 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 앱을 확인합니다.

## .env.example 내용

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-auth-secret-here"
AUTH_GITHUB_ID="your-github-oauth-app-id"
AUTH_GITHUB_SECRET="your-github-oauth-app-secret"
```

`AUTH_SECRET`은 `npx auth secret` 명령으로 생성할 수 있습니다.

## 프로젝트 구조

```
nextjs-todo/
├── prisma/
│   └── schema.prisma          # 데이터베이스 스키마 (User, Todo, Account, Session)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth 핸들러
│   │   │   └── todos/route.ts               # REST API (GET/POST)
│   │   ├── login/page.tsx                   # 로그인 페이지
│   │   ├── todos/
│   │   │   ├── page.tsx                     # Todo 목록 (서버 컴포넌트)
│   │   │   ├── actions.ts                   # 서버 액션
│   │   │   └── loading.tsx                  # 스켈레톤 UI
│   │   ├── layout.tsx                       # 루트 레이아웃
│   │   ├── page.tsx                         # 홈 페이지
│   │   └── globals.css                      # Tailwind CSS
│   ├── lib/
│   │   ├── auth.ts                          # NextAuth 설정
│   │   └── prisma.ts                        # Prisma 클라이언트 싱글톤
│   └── middleware.ts                        # 인증 미들웨어
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## 기술 스택

- **Next.js 15** — App Router, Server Components, Server Actions
- **TypeScript** — 타입 안전성
- **Tailwind CSS** — 유틸리티 기반 스타일링
- **Prisma** — ORM (SQLite 개발 / PostgreSQL 프로덕션)
- **NextAuth.js v5** — GitHub OAuth 인증
