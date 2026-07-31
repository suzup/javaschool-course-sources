package org.javaschool.quiz;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.javaschool.quiz.answer.AnswerAttempt;
import org.javaschool.quiz.answer.AnswerAttemptRepository;
import org.javaschool.quiz.answer.AnswerResult;
import org.javaschool.quiz.answer.AnswerService;
import org.javaschool.quiz.answer.SubmitAnswerRequest;
import org.javaschool.quiz.question.Question;
import org.javaschool.quiz.question.QuestionNotFoundException;
import org.javaschool.quiz.question.QuestionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
// DB 없이 AnswerService의 처리 순서만 확인합니다.
class AnswerServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AnswerAttemptRepository answerAttemptRepository;

    @InjectMocks
    private AnswerService answerService;

    @Test
    void gradesWithStoredAnswerAndSavesOneAttempt() {
        Question question = Question.create(
                "같은 코드를 정해진 횟수만큼 반복할 때 알맞은 문장은 무엇일까요?",
                "if 문", "for 문", "switch 문", "return 문", 2,
                "for 문은 반복 횟수를 정해 같은 코드를 여러 번 실행할 때 사용합니다."
        );
        when(questionRepository.findById(3L)).thenReturn(Optional.of(question));

        AnswerResult result = answerService.submit(new SubmitAnswerRequest(3L, 2));

        assertTrue(result.correct());
        assertEquals(2, result.correctChoiceId());
        verify(answerAttemptRepository).save(any(AnswerAttempt.class));
    }

    @Test
    void savesNothingWhenQuestionIsMissing() {
        when(questionRepository.findById(999L)).thenReturn(Optional.empty());

        QuestionNotFoundException thrown = assertThrows(
                QuestionNotFoundException.class,
                () -> answerService.submit(new SubmitAnswerRequest(999L, 1))
        );

        assertEquals("해당 번호의 퀴즈 문제가 없습니다: 999", thrown.getMessage());
        verify(answerAttemptRepository, never()).save(any(AnswerAttempt.class));
    }
}
