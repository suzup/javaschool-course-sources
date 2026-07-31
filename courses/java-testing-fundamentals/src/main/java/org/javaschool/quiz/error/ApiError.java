package org.javaschool.quiz.error;

// 화면에 공개할 오류 코드와 안내 문장을 전달합니다.
public record ApiError(String code, String message) {
}
