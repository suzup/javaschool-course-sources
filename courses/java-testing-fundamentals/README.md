# 손으로 확인하지 않는 Java 테스트 입문 — 최종 소스

8강까지 끝난 시점의 퀴즈 서버 전체 소스입니다. 강의의 코드 블록과 실행 결과는 이 소스에서 얻었습니다.

앞 과정(`spring-boot-quiz`)에서 만든 서버에 자동 테스트를 얹은 결과입니다. 서버 동작은 앞 과정과 같습니다. 브라우저로 매번 눌러 보던 확인을 명령 하나로 대신하게 된 것이 달라졌습니다. 검사 **23개가 모두 통과**하는 상태입니다.

## 실행 환경

| 항목 | 값 | 확인 명령 |
|---|---|---|
| Java | 17 | `java -version` |
| Gradle Wrapper | 9.5.1 | `./gradlew --version` |
| Spring Boot | 4.0.7 | `build.gradle` |
| MySQL | 8.0.46 | `mysql --version` |

## 준비

MySQL Workbench에서 [`database/setup.sql`](database/setup.sql)의 `change_me`를 자신의 비밀번호로 바꾼 뒤 실행합니다. 실행용 `java_quiz`와 검사용 `java_quiz_test`를 함께 만듭니다.

프로젝트 루트에 `.env` 파일을 만들고 두 DB 값을 적습니다. 이 파일은 저장소에 넣지 않습니다.

```properties
QUIZ_DB_URL=jdbc:mysql://localhost:3306/java_quiz
QUIZ_DB_USERNAME=quiz_app
QUIZ_DB_PASSWORD=내가 정한 비밀번호

QUIZ_TEST_DB_URL=jdbc:mysql://localhost:3306/java_quiz_test
QUIZ_TEST_DB_USERNAME=quiz_app
QUIZ_TEST_DB_PASSWORD=내가 정한 비밀번호
```

## 검사 실행

```bash
./gradlew test
```

케이스별 결과가 한 줄씩 나오고 마지막에 `BUILD SUCCESSFUL`이 나옵니다.

MySQL을 직접 설치하지 않고 확인하려면 Docker로 함께 띄웁니다.

```bash
docker compose -f docker-compose.qa.yml run --rm test
```

로컬 3307 포트를 이미 쓰는 컨테이너가 있으면 먼저 정리하거나 `-p` 옵션으로 프로젝트 이름을 구분합니다.

## 검사 구성

| 파일 | 확인하는 것 | 개수 | 관련 수업 |
|---|---|---|---|
| `ScoringTest` | 정답 번호를 보냈을 때 정답 판정 | 1 | 1강 |
| `QuestionRuleTest` | 판정 결과, 정답 번호, 잘못된 문제 등록 거절 | 3 | 2강 |
| `SubmissionSheetTest` | 제출 한 건이 채점표 한 행으로 남고 각 검사가 빈 표에서 시작 | 2 | 3강 |
| `ChoiceGradingTest` | 선택지 네 개를 한 번씩 보내 전수 판정 | 7 | 4강 |
| `AnswerServiceTest` | DB 없이 Mockito로 처리 순서와 저장 호출 | 2 | 5강 |
| `QuizApiTest` | 브라우저가 쓰는 조회·제출·통계 흐름을 테스트 DB에서 | 3 | 6강 |
| `QuizRepositoryTest` | 실제 MySQL에 한글 문제와 풀이 기록 저장 | 1 | 6강 |
| `QuizStatsTest` | 누적 정답률이 가장 가까운 정수 퍼센트 | 4 | 7강 |

`QuizApiTest`와 `QuizRepositoryTest`는 앞 과정에서 이미 만든 것입니다. 6강은 이 두 파일을 읽고 통합 검사의 구조를 확인하는 수업입니다.

## 앞 과정에서 고친 곳

`QuizStats`가 정답률을 정수 나눗셈으로 계산해 소수점 아래를 버리고 있었습니다.

```java
// 앞 과정: 3문제 중 2개 정답이면 66
int correctRate = (int) (correctCount * 100 / answeredCount);

// 7강 이후: 67
int correctRate = (int) Math.round(correctCount * 100.0 / answeredCount);
```

`QuizStatsTest`의 `"3, 2, 67"`과 `"8, 1, 13"`이 이 차이를 잡습니다. 고치기 전에는 66과 12가 나와 두 케이스가 실패합니다. 8강은 이 실패를 일부러 되돌려 자동 실행이 사람 대신 막아 주는 것을 보여 줍니다. 이 소스는 고친 상태입니다.

## 자동 실행

[`.github/workflows/test.yml`](.github/workflows/test.yml)이 `main`으로 올릴 때와 합치자고 요청할 때 MySQL을 함께 띄워 `./gradlew test`를 실행합니다. 실패하면 그 단계에서 멈추고, 실패했을 때도 리포트를 남깁니다.

## 직접 확인해 볼 것

- `ChoiceGradingTest`의 `"2, true"`를 `"2, false"`로 바꾸고 실행한 뒤 종료 코드만 봅니다. `1`이 나옵니다. 출력을 읽지 않아도 통과 여부를 판단할 수 있습니다.
- `./gradlew test`를 두 번 연속 실행하면 두 번째는 검사 줄이 나오지 않습니다. 입력이 바뀌지 않은 작업을 Gradle이 다시 실행하지 않기 때문이며, 매번 확인해야 할 때는 `--rerun-tasks`가 필요합니다.
- `AnswerServiceTest`에서 `when(...)` 한 줄을 빼면 Mockito가 준비되지 않은 호출을 알려 줍니다.
