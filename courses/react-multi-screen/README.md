# 화면이 여러 개가 될 때의 주소와 공유 상태 — 최종 소스

8강까지 끝난 시점의 `quiz-react` 전체 소스입니다. 강의의 코드 블록과 실행 결과는 이 소스에서 얻었습니다.
`퀴즈 UI를 컴포넌트로 만드는 React 기초`의 최종 소스를 그대로 이어받아 주소 나누기와 함께 보는 값을 더했습니다.

## 실행 환경

| 항목 | 값 | 확인 명령 |
|---|---|---|
| Node | v22.23.1 | `node --version` |
| npm | 10.9.8 | `npm --version` |
| React / React DOM | 19.2.8 | `npm ls react react-dom` |
| react-router | 8.3.0 (선언형 모드) | `npm ls react-router` |
| Vite | 7.3.6 | `npx vite --version` |
| 서버 | `spring-boot-login`의 `http://localhost:8080/api/quiz` | `curl` 200 |

React Router 8은 `node@22.22+`와 `react@19.2.7+`를 요구하고, `react-router-dom` 재수출 패키지가 없으므로
모든 가져오기를 `react-router`에서 합니다. `vite.config.js`의 `base`는 앞 과정의 `'./'`에서 `'/'`로 바꿨습니다.

## 준비

```bash
npm install
```

서버는 `courses/spring-boot-login`의 최종 소스를 띄웁니다. MySQL을 설치하지 않았다면 그 폴더에서 다음을 실행합니다.

```bash
docker compose -f docker-compose.qa.yml up -d app
```

서버가 준비되면 스터디원과 풀이 기록을 만듭니다.

```bash
node check/server-seed.mjs
```

## 명령

| 명령 | 하는 일 |
|---|---|
| `npm run dev` | 개발 서버(`5173`) |
| `npm run build` | `dist` 결과 파일 생성 (`base: '/'`) |
| `npm run snapshot` | 주소별로 만들어지는 화면을 문자열로 확인 |
| `npm run lint` | `react-refresh/only-export-components` 등 정적 검사 |

## 강의별 확인 파일

| 파일 | 확인하는 것 | 강 |
|---|---|---|
| `legacy/state-switch.mjs` | 상태 값으로 화면을 바꿀 때 주소가 그대로인 것 | 1 |
| `check/login-check.mjs` | 로그인 성공·실패 응답과 화면 안내 | 2 |
| `check/record-view-check.mjs` | 주소의 번호로 문제를 가져온 결과와 실패 응답 모양 | 3 |
| `check/me-request-check.mjs` | 사용자 정보 요청 수 2회 → 1회 | 4 |
| `check/guard-check.mjs` | 보호된 자리의 세 가지 판단 | 5 |
| `check/arrival-check.mjs` | 막힌 자리에서 로그인 뒤 도착 주소까지 | 6 |
| `check/spa-server.mjs` | 없는 주소를 첫 파일로 되돌리는 파일 서버 | 8 |
| `check/server-seed.mjs` | 실습에 필요한 회원과 풀이 기록 만들기 | 1~8 |

`answer-check.mjs`처럼 폴더 바로 아래에 있는 파일은 앞 과정에서 만든 확인 파일이며 그대로 두었습니다.

## 파일을 읽는 순서

```text
src/App.jsx            BrowserRouter와 함께 보는 값으로 감싸고 이동 줄을 둔다
→ src/routes.jsx       주소와 화면의 짝을 모아 둔다
→ src/RequireLogin.jsx 로그인이 필요한 자리를 감싼다
→ src/guard.js         보내기 판단과 도착 자리를 정한다
→ src/SessionProvider.jsx 로그인한 사람과 이번 접속 기록을 담는다
→ src/session-context.js  담는 자리와 읽는 훅
```

## 확인할 동작

- `/quiz`, `/records`, `/records/3`을 새로 고쳐도 그 자리가 열림
- 로그인하지 않고 `/records`를 열면 로그인 화면으로 가고, 로그인 뒤 열려던 자리로 돌아옴
- 로그인 실패 안내가 로그인 화면에만 남고 문제 화면이 만들어지지 않음
- `/records/9`는 없는 번호 안내, `/records/abc`는 요청 실패 안내가 나옴(`undefined`가 아님)
- 사용자 정보 요청이 화면 수와 관계없이 한 번만 나감
- 로그아웃하면 두 화면이 함께 비로그인 상태가 됨
- `/recordz`와 `/records/3/detail`은 없는 주소 안내가 나옴
- 빌드 결과를 되돌림 설정이 있는 파일 서버에 올리면 `/records/3` 새로 고침이 화면을 돌려주고 자산이 `text/javascript`로 옴
