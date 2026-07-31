# 퀴즈 UI를 컴포넌트로 만드는 React 기초 — 최종 소스

10강까지 끝난 시점의 `quiz-react` 전체 소스입니다. 강의의 코드 블록과 실행 결과는 이 소스에서 얻었습니다.

## 실행 환경

| 항목 | 값 | 확인 명령 |
|---|---|---|
| Node | v22.23.1 | `node --version` |
| npm | 10.9.8 | `npm --version` |
| React | 19.2.8 | `npm ls react` |
| Vite | 7.3.6 | `npx vite --version` |
| 로컬 API | `http://localhost:8788/api/learning/v1/quiz` | `curl` 200 |
| 공개 API | `https://api.javaschool.org/api/learning/v1/quiz` | `curl` 200, `access-control-allow-origin: *` |

## 준비

```bash
npm install
```

문제와 채점은 앞 과정(`spring-boot-quiz`)이 만든 퀴즈 API가 담당한다. 기본값은 공개 API 주소이므로 그대로 실행할 수 있습니다.

## 명령

| 명령 | 하는 일 |
|---|---|
| `npm run dev` | 개발 서버(`5173`) |
| `npm run build` | `dist` 결과 파일 생성 (`base: './'`, `.env.production`의 `VITE_API_BASE_URL` 사용) |
| `npm run preview` | 빌드 결과만 서비스(`4173`) |
| `npm run snapshot` | `src/snapshot.jsx`를 서버에서 렌더링해 HTML 문자열과 React 경고를 표준 출력으로 확인 |
| `npm run lint` | `react-hooks/exhaustive-deps` 등 정적 검사 |

## 강의별 확인 파일

브라우저 클릭 없이 값으로 확인하는 파일입니다. 모두 `node <파일>`로 실행합니다.

| 파일 | 확인하는 것 | 강 |
|---|---|---|
| `legacy-replay/replay.mjs` | 앞 과정 화면의 잔류 버그 재생 | 1 |
| `input-check.mjs` | 입력 글자를 선택지 번호로 바꾸는 판단 | 4 |
| `answer-check.mjs` | 채점 요청의 실제 응답 | 5, 9 |
| `order-check.mjs` | 선택지 순서를 돌리는 규칙 | 6 |
| `api-check.mjs` | 있는 번호와 없는 번호의 응답 | 7, 10 |
| `loop-check.mjs` | 화면을 만드는 자리에서 요청할 때의 요청 수 | 7 |
| `deps-check.mjs` | 의존성 배열에 따라 요청을 다시 보내는지 | 7 |
| `race-check.mjs` | 늦게 온 응답을 버리는지 | 7 |
| `flags-check.mjs` | 값을 따로 담을 때와 한 값으로 담을 때의 차이 | 8 |
| `score-check.mjs` | 실제 채점 5문제와 점수 누적 방식 | 9 |
| `full-run.mjs` | 화면이 밟는 순서 전체와 없는 번호 요청 | 9 |

`snapshot.jsx`는 강의마다 내용을 바꿔 쓰는 확인용 파일이며, 지금 들어 있는 것은 9강 시점의 내용입니다.
