package org.javaschool.quiz.question;

import java.util.List;

// 문제 목록과 전체 문제 수를 함께 전달합니다.
public record QuestionListResponse(List<QuestionResponse> data, int count) {
}
