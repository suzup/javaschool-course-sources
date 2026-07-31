package org.javaschool.quiz.member;

// 로그인 결과입니다. 화면이 값을 직접 들고 보낼 때 쓰는 토큰을 함께 돌려줍니다.
public record LoginResponse(MemberResponse member, String token) {
}
