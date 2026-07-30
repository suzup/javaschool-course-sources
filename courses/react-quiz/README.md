# 퀴즈 UI를 컴포넌트로 만드는 React 기초

10개 레슨으로 구성된 React 퀴즈 앱 과정의 최종 소스 코드입니다.

## 기술 스택

- React 19 + TypeScript
- Vite
- API 기반 퀴즈 데이터 페칭 및 답안 제출

## 사전 요구 사항

- Node.js 20+

## 로컬 개발

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 빌드 및 배포

```bash
npm run build
```

`dist/` 디렉터리를 Vercel에 배포합니다.

## 앱 흐름

1. Mock API에서 10개 퀴즈 문제를 가져옵니다
2. 한 번에 하나의 문제를 4개 선택지와 함께 표시합니다
3. 선택한 답안을 추적합니다
4. 모든 답안을 제출합니다
5. 결과(점수, 문제별 정답/오답)를 표시합니다
