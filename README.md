# JavaSchool 강의 소스

JavaSchool 학습 과정에서 사용하는 실행 소스를 모아 둔 저장소입니다.

강의 원고는 [JavaSchool](https://javaschool.org/ko)에서 읽고, 이 저장소에서는 과정별 최종 완성 소스를 확인합니다. 과정마다 `courses` 아래에 독립된 폴더를 사용합니다.

## 과정 목록

| 과정 | 강의 | 소스 폴더 | 실행 환경 |
|---|---|---|---|
| 카페 주문 프로그램으로 배우는 Java 기초 | [강의 보기](https://javaschool.org/ko/paths/java-foundations-object-first) | [`courses/java-foundations-cafe`](courses/java-foundations-cafe) | Java 17 |
| 직접 만들고 플레이하는 Java 객체지향 퀴즈 | [강의 보기](https://javaschool.org/ko/paths/java-oop-quiz) | [`courses/java-oop-quiz`](courses/java-oop-quiz) | Java 17 |
| Spring Boot 전에 끝내는 HTML·JavaScript | [강의 보기](https://javaschool.org/ko/paths/html-javascript-api-bridge) | [`courses/html-javascript-quiz`](courses/html-javascript-quiz) | Chrome 또는 Edge |
| Java 퀴즈 서버를 직접 만드는 Spring Boot 입문 | [강의 보기](https://javaschool.org/ko/paths/spring-boot-quiz) | [`courses/spring-boot-quiz`](courses/spring-boot-quiz) | Java 17, Spring Boot 4.0.7, MySQL 8.0 |
| 로그인과 사용자별 기록 | [강의 보기](https://javaschool.org/ko/paths/spring-boot-login) | [`courses/spring-boot-login`](courses/spring-boot-login) | Java 17, Spring Boot 4.0.7, MySQL 8.0 |
| 퀴즈 UI를 컴포넌트로 만드는 React 기초 | [강의 보기](https://javaschool.org/ko/paths/react-fundamentals) | [`courses/react-fundamentals`](courses/react-fundamentals) | Node.js 22+, React 19, Vite 7 |
| 화면이 여러 개가 될 때의 주소와 공유 상태 | [강의 보기](https://javaschool.org/ko/paths/react-multi-screen) | [`courses/react-multi-screen`](courses/react-multi-screen) | Node.js 22+, React 19, React Router 8, Vite 7 |
| 타입으로 버그 막기 — TypeScript 입문 | [강의 보기](https://javaschool.org/ko/paths/typescript-intro) | [`courses/typescript-intro`](courses/typescript-intro) | Node.js 22+, TypeScript 5.9 |
| 손으로 확인하지 않는 Java 테스트 입문 | [강의 보기](https://javaschool.org/ko/paths/java-testing-fundamentals) | [`courses/java-testing-fundamentals`](courses/java-testing-fundamentals) | Java 17, Spring Boot 4.0.7, MySQL 8.0 |
| 내 반응이 순서를 바꾸는 피드 | [강의 보기](https://javaschool.org/ko/paths/personalized-feed) | [`courses/personalized-feed`](courses/personalized-feed) | Chrome 또는 Edge |
| 가까운 곳부터 세우는 지도 | [강의 보기](https://javaschool.org/ko/paths/nearby-map) | [`courses/nearby-map`](courses/nearby-map) | Chrome 또는 Edge |
| 사진이 붙는 중고마켓 | [강의 보기](https://javaschool.org/ko/paths/secondhand-market) | [`courses/secondhand-market`](courses/secondhand-market) | Chrome 또는 Edge |
| 시킨 것을 따라가는 주문 현황판 | [강의 보기](https://javaschool.org/ko/paths/order-tracking) | [`courses/order-tracking`](courses/order-tracking) | Chrome 또는 Edge |
| 링크로 주고받는 같이 듣는 목록 | [강의 보기](https://javaschool.org/ko/paths/collaborative-playlist) | [`courses/collaborative-playlist`](courses/collaborative-playlist) | Chrome 또는 Edge |

## 소스 사용 방법

각 과정 폴더의 `README.md`에서 준비물과 실행 명령을 확인하세요.

대부분의 과정은 최종 완성 소스만 있습니다. 브라우저 세미 프로젝트 다섯(피드·지도·중고마켓·주문 현황판·같이 듣는 목록)은 `starter/` 폴더를 함께 둡니다. **1강은 `starter/`에서 시작합니다.** 강의가 직접 치게 하는 코드는 빼 두었고, 폴더 바깥의 최종본은 따라 치다 어긋났을 때 맞춰 보는 용도입니다.

실제 DB 비밀번호, 개인 환경 설정과 빌드 결과는 저장소에 올리지 않습니다.

## 관리 원칙

- 강의 원고, 서비스 코드와 내부 제작 파일은 이 저장소에 넣지 않습니다.
- 최종 소스가 바뀌면 해당 과정 폴더와 실행 안내를 함께 갱신합니다.
- Java 과정은 Java 17 컴파일, HTML·JavaScript 과정은 JavaScript 문법 검사, Spring Boot 과정은 실제 MySQL 기반 테스트를 통과해야 합니다.
- 새 과정도 별도 저장소를 만들지 않고 `courses/<과정 이름>`에 추가합니다.
- 강의별 중간 체크포인트와 태그는 현재 공개하지 않습니다. 시작본과 최종본 두 벌만 둡니다.
- 폐기한 과정의 소스는 저장소에서 지웁니다. 2026-07-31에 Vue·Next.js·Node.js 과정과, 다시 쓴 과정의 옛 React·TypeScript 소스를 지웠습니다.
- SQL, 네트워크, 배포, 변경 기록 과정은 별도 실행 소스 대신 강의 안의 명령과 시드 SQL을 사용하므로 이 저장소에 폴더를 두지 않습니다.
