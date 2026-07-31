# 타입으로 버그 막기 — TypeScript 입문 최종 소스

8강까지 끝난 시점의 `quiz-types` 전체 소스입니다. 강의의 코드 블록과 실행 결과는 이 소스에서 얻었습니다.

앞 과정(`html-javascript-quiz`)에서 만든 퀴즈 화면 `app.js`를 TypeScript로 옮긴 결과입니다. 화면 동작은 앞 과정과 같습니다. 값이 없거나 모양이 다른 자리를 실행 전에 알려 주는 것만 달라졌습니다. 8강에서 `npx tsc`가 보고한 오류 47줄이 0줄이 된 상태입니다.

## 실행 환경

| 항목 | 값 | 확인 명령 |
|---|---|---|
| Node.js | v22.23.2 | `node --version` |
| npm | 10.9.8 | `npm --version` |
| TypeScript | 5.9.3 | `npx tsc --version` |
| 공개 API | `https://api.javaschool.org/api/learning/v1/quiz` | `curl` 200 |

## 준비

```bash
npm install
```

문제와 채점은 앞 과정들이 만든 공개 퀴즈 API가 담당합니다. 주소가 이미 들어 있으므로 그대로 실행할 수 있습니다.

## 명령

| 명령 | 하는 일 |
|---|---|
| `npx tsc` | 검사하고 `dist`에 결과 파일 생성 |
| `npm run check` | 결과 파일을 만들지 않고 검사만 |
| `npm run build` | `npx tsc`와 같음 |

`npx tsc`가 아무것도 출력하지 않으면 통과입니다. `dist`에 파일 네 개가 만들어집니다.

```text
api-client.js
api-types.js
app.js
elements.js
```

## 화면 실행

`import`를 사용하므로 파일을 직접 열지 않고 주소로 받아야 합니다. 브라우저는 `file://`에서 모듈을 불러오지 못합니다.

```bash
npx tsc
python3 -m http.server 8099
```

브라우저에서 `http://127.0.0.1:8099/index.html`을 엽니다. 문제와 선택지가 나오고, 1부터 4까지의 번호를 보내면 정답과 해설, 누적 점수가 보입니다.

`index.html`이 불러오는 대상은 `./dist/app.js`입니다. 8강 본문은 `type="module"`이 필요하다는 점을 보여 주는 자리라 경로를 함께 적지 않았습니다. `tsc`가 결과를 `dist`에 만들므로 실제로 열리는 화면에서는 이 경로여야 합니다.

## 파일 구성

| 파일 | 역할 | 관련 수업 |
|---|---|---|
| `src/api-types.ts` | 서버 응답의 모양. `ApiResult<T>`로 `data`와 `error`를 갈라 둡니다 | 3강, 6강, 7강 |
| `src/api-client.ts` | `requestJson<T>`로 요청하고 `describeError`로 오류 코드를 문장으로 바꿉니다 | 4강, 6강, 7강 |
| `src/elements.ts` | `requireElement<T>`로 요소를 한곳에서 찾고 `null`을 한 번만 확인합니다 | 5강, 8강 |
| `src/app.ts` | 화면 코드. 문제 표시, 정답 제출, 점수 계산 | 8강 |
| `tsconfig.json` | `strict`, `nodenext`, `outDir` | 1강, 8강 |

`src`에는 이 네 파일만 있습니다. 수업에서 만든 `picked.ts`, `score.ts`, `message.ts` 같은 파일은 개념을 확인하는 연습용이라 최종 소스에 넣지 않았습니다.

## 직접 확인해 볼 것

- `tsconfig.json`의 `strict`를 `false`로 바꾼 뒤 `npx tsc`를 다시 실행합니다. 이 과정에서 만든 검사 대부분이 조용해집니다.
- `api-types.ts`의 정의는 서버와의 약속이고 검증이 아닙니다. `requestJson`의 `as ApiResult<T>`는 응답을 검사하지 않고 그렇다고 믿는 자리입니다. 서버가 주는 모양이 바뀌면 실행 시점에 드러납니다.
- `requireElement`에서 종류를 `HTMLElement`로 바꿔 보면 `answerInput.value`를 읽는 자리가 다시 오류로 잡힙니다.
