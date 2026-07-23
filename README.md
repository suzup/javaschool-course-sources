# JavaSchool 강의 소스

JavaSchool 학습 과정에서 사용하는 실행 소스를 모아 둔 저장소입니다.

강의 원고는 JavaSchool 사이트에서 읽고, 이 저장소에서는 과정별 최종 완성 소스를 확인합니다. 과정마다 `courses` 아래에 독립된 폴더를 사용합니다.

## 과정 목록

| 과정 | 소스 폴더 | 실행 환경 |
|---|---|---|
| 카페 주문 프로그램으로 배우는 Java 기초 | [`courses/java-foundations-cafe`](courses/java-foundations-cafe) | Java 17 |
| 직접 만들고 플레이하는 Java 객체지향 퀴즈 | [`courses/java-oop-quiz`](courses/java-oop-quiz) | Java 17 |
| Spring Boot 전에 끝내는 HTML·JavaScript | [`courses/html-javascript-quiz`](courses/html-javascript-quiz) | Chrome 또는 Edge |
| Java 퀴즈 서버를 직접 만드는 Spring Boot 입문 | [`courses/spring-boot-quiz`](courses/spring-boot-quiz) | Java 17, Spring Boot 3.5.16, MySQL 8.0 |

## 소스 사용 방법

각 과정 폴더의 `README.md`에서 준비물과 실행 명령을 확인하세요. 현재는 각 과정의 최종 완성 소스만 제공합니다.

실제 DB 비밀번호, 개인 환경 설정과 빌드 결과는 저장소에 올리지 않습니다.

## 관리 원칙

- 강의 원고, 서비스 코드와 내부 제작 파일은 이 저장소에 넣지 않습니다.
- 최종 소스가 바뀌면 해당 과정 폴더와 실행 안내를 함께 갱신합니다.
- Java 과정은 Java 17 컴파일, HTML·JavaScript 과정은 JavaScript 문법 검사, Spring Boot 과정은 실제 MySQL 기반 테스트를 통과해야 합니다.
- 새 과정도 별도 저장소를 만들지 않고 `courses/<과정 이름>`에 추가합니다.
- 강의별 중간 체크포인트와 태그는 현재 공개하지 않습니다.
