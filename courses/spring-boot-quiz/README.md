# Spring Boot Java 퀴즈 완성 프로그램

HTML·JavaScript 과정에서 사용한 퀴즈 API를 Java 17, Spring Boot 4.0.7과 MySQL 8.0.46으로 직접 구현한 강의 작업 원본입니다. Gradle은 Spring Initializr가 생성한 Wrapper 9.5.1을 사용하므로 따로 설치하지 않습니다.

처음 환경을 준비한다면 JavaSchool 과정에 연결된 **Windows 11·VS Code·Java 17·MySQL 설치 읽을거리**를 먼저 확인합니다.

## 준비

MySQL Workbench에서 [`database/setup.sql`](database/setup.sql)의 `change_me`를 자신의 비밀번호로 바꾼 뒤 실행합니다. 애플리케이션은 root가 아니라 `quiz_app` 계정으로 접속합니다.

VS Code PowerShell에서 환경 변수를 정합니다.

```powershell
$env:QUIZ_DB_URL="jdbc:mysql://localhost:3306/java_quiz"
$env:QUIZ_DB_USERNAME="quiz_app"
$env:QUIZ_DB_PASSWORD="내가 정한 비밀번호"
```

## 실행

```powershell
.\gradlew.bat bootRun
```

브라우저에서 `http://localhost:8080`을 엽니다. 빈 DB로 처음 실행하면 Java 기초 문제 다섯 개가 자동으로 들어갑니다.

## 테스트

테스트도 H2가 아니라 별도의 MySQL DB를 사용합니다.

```powershell
$env:QUIZ_TEST_DB_URL="jdbc:mysql://localhost:3306/java_quiz_test"
$env:QUIZ_TEST_DB_USERNAME="quiz_app"
$env:QUIZ_TEST_DB_PASSWORD="내가 정한 비밀번호"
.\gradlew.bat test
```

## 확인할 동작

- 문제 목록과 한 문제 조회에서 정답이 노출되지 않음
- 정답 번호를 보내면 정답 여부·정답 번호·해설 응답
- 잘못된 선택 번호는 `422`, 없는 문제는 `404`
- 정답과 오답 제출이 `answer_attempt` 테이블에 저장됨
- 새로고침하면 브라우저 점수는 0이지만 MySQL 누적 통계는 유지됨
- MySQL의 한글 문제와 해설이 브라우저와 동일하게 표시됨

## 제작자용 Docker 검증

강의 수강생은 Windows에 설치한 MySQL을 사용합니다. 저장소에서 완성 프로그램을 검증할 때만 별도 Compose 파일을 사용합니다.

```bash
docker compose -f docker-compose.qa.yml run --rm test
docker compose -f docker-compose.qa.yml up -d app
```

두 번째 명령은 `http://localhost:8080`에 완성 화면을 실행합니다.
