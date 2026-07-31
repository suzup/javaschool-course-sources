package org.javaschool.quiz.answer;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

// 화면에서 받은 문제 번호와 선택 번호를 전달합니다.
public record SubmitAnswerRequest(
        @NotNull(message = "questionId를 보내 주세요.")
        @Positive(message = "questionId는 1 이상의 숫자여야 합니다.")
        Long questionId,

        @NotNull(message = "choiceId를 보내 주세요.")
        @Min(value = 1, message = "choiceId는 1부터 4까지여야 합니다.")
        @Max(value = 4, message = "choiceId는 1부터 4까지여야 합니다.")
        Integer choiceId
) {
}
