package org.javaschool.quiz.error;

// 공개 퀴즈 API와 같은 error 속성 안에 오류를 담습니다.
public record ApiErrorResponse(ApiError error) {
}
