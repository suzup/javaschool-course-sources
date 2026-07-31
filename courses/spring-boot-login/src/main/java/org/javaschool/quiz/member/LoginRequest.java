package org.javaschool.quiz.member;

import jakarta.validation.constraints.NotBlank;

// 로그인 요청으로 받는 두 값입니다.
public record LoginRequest(
        @NotBlank String name,
        @NotBlank String password
) {
}
