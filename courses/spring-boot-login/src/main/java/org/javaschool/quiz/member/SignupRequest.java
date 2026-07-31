package org.javaschool.quiz.member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// 가입 요청으로 받는 두 값입니다.
public record SignupRequest(
        @NotBlank(message = "이름을 보내 주세요.") @Size(max = 40, message = "이름은 40자까지입니다.") String name,
        @NotBlank(message = "비밀번호를 보내 주세요.") @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.") String password
) {
}
