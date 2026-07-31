package org.javaschool.quiz.question;

import java.util.ArrayList;
import java.util.List;

// 정답을 제외한 문제와 선택지를 화면에 전달합니다.
public record QuestionResponse(Long id, String question, List<ChoiceResponse> choices) {

    public static QuestionResponse from(Question question) {
        List<ChoiceResponse> choices = new ArrayList<>();
        List<String> choiceTexts = question.choices();
        for (int index = 0; index < choiceTexts.size(); index++) {
            choices.add(new ChoiceResponse(index + 1, choiceTexts.get(index)));
        }
        return new QuestionResponse(question.getId(), question.getQuestionText(), choices);
    }
}
