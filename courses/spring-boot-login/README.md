# 로그인과 사용자별 기록 — 최종 소스

`Java 퀴즈 서버를 직접 만드는 Spring Boot 입문`에서 만든 서버에 로그인과 사용자별 기록을 더한 최종 소스입니다. 강의 10강까지 끝난 상태입니다.

## 실행 환경

| 항목 | 값 |
|---|---|
| Java | 17 |
| Spring Boot | 4.0.7 |
| Gradle | 함께 들어 있는 Wrapper 9.5.1 |
| MySQL | 8.0 (`java_quiz`, 테스트용 `java_quiz_test`) |
| 추가 의존성 | `spring-boot-starter-security` |

## 준비

MySQL Workbench에서 [`database/setup.sql`](database/setup.sql)의 `change_me`를 자신의 비밀번호로 바꾼 뒤 실행합니다. 서버는 root가 아니라 `quiz_app` 계정으로 접속합니다.

프로젝트 루트에 `.env` 파일을 만들어 접속값과 토큰 설정을 적습니다. 이 파일은 저장소에 올리지 않습니다.

```properties
QUIZ_DB_URL=jdbc:mysql://localhost:3306/java_quiz
QUIZ_DB_USERNAME=quiz_app
QUIZ_DB_PASSWORD=내가 정한 비밀번호

QUIZ_TEST_DB_URL=jdbc:mysql://localhost:3306/java_quiz_test
QUIZ_TEST_DB_USERNAME=quiz_app
QUIZ_TEST_DB_PASSWORD=내가 정한 비밀번호

QUIZ_TOKEN_SECRET=내가 정한 긴 문자열
QUIZ_TOKEN_VALID_SECONDS=1800
```

`QUIZ_TOKEN_SECRET`은 토큰 서명에 쓰는 열쇠입니다. 값을 바꾸면 이미 발급한 토큰이 모두 무효가 됩니다.

## 실행

```powershell
.\gradlew.bat bootRun
```

브라우저에서 `http://localhost:8080`을 엽니다. 빈 DB로 처음 실행하면 문제 다섯 개가 한 번 들어갑니다.

## 확인 파일

`check/` 아래 파일은 강의에서 값으로 결과를 확인할 때 쓰는 파일입니다. Node 18 이상에서 서버를 띄운 뒤 실행합니다. 기본 주소가 다르면 `QUIZ_BASE_URL`로 지정합니다.

| 파일 | 확인하는 것 | 강 |
|---|---|---|
| `check/signup-check.mjs` | 가입, 이름 중복 409, 입력 조건 422 | 1 |
| `check/login-check.mjs` | 로그인과 `Set-Cookie`, 쿠키 없는 요청 401 | 2 |
| `check/answer-check.mjs` | 두 사람의 제출과 로그인 없는 제출 거절 | 3 |
| `check/stats-check.mjs` | 내 기록, 전체 누적, 남의 번호 조회 403 | 4·5 |
| `check/cors-check.mjs` | 다른 주소 화면에 대한 허가 머리글 | 6 |
| `check/token-check.mjs` | 토큰 발급과 검증, 어긋난 토큰 401 | 7 |
| `check/logout-check.mjs` | 로그아웃 뒤 쿠키와 토큰의 차이 | 8 |
| `check/restart-check.mjs`, `check/after-restart-check.mjs` | 서버 재시작 전후 | 8 |
| `check/expiry-check.mjs` | 만료 시간을 짧게 둔 뒤의 401 | 8 |
| `check/compare-check.mjs` | 두 방식이 같은 응답을 돌려주는지 | 9 |

확인 파일은 실습용 스터디원 이름과 비밀번호(`민수`/`quiz-study-1`, `가온`/`quiz-study-2`)를 사용합니다. 실제 계정 값이 아닙니다.

## 테스트

```powershell
.\gradlew.bat test
```

`LoginApiTest` 5건, `QuizApiTest` 3건, `QuizRepositoryTest` 1건으로 모두 9건입니다. 테스트는 실행용 DB와 분리된 `java_quiz_test`를 사용합니다.

## 확인할 동작

- 가입 뒤 표에 원문 비밀번호가 없고 해시만 저장됨
- 로그인하지 않은 제출과 조회는 401이며 기록이 생기지 않음
- 두 사람의 기록이 회원 번호로 나뉘고 사람별 값의 합이 전체 값과 같음
- 남의 번호로 조회하면 403이며 응답에 값이 없음
- 다른 주소에서 열린 화면도 허용 주소를 적으면 로그인 상태가 이어짐
- 토큰으로도 같은 규칙이 통과하고 한 글자 바꾼 토큰은 401
- 로그아웃 뒤 쿠키는 401, 만료 전 토큰은 200
- 서버를 다시 띄우면 쿠키는 401, 토큰은 200

## Docker로 확인하기

MySQL을 따로 설치하지 않고 확인할 때 사용합니다. 이 파일의 비밀번호는 로컬 확인 전용 값입니다.

```bash
docker compose -f docker-compose.qa.yml run --rm test
docker compose -f docker-compose.qa.yml up -d app
```
