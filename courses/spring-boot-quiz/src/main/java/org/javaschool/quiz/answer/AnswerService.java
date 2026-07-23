package org.javaschool.quiz.answer;

import org.javaschool.quiz.question.Question;
import org.javaschool.quiz.question.QuestionNotFoundException;
import org.javaschool.quiz.question.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
// 문제를 찾고 정답을 판정한 뒤 풀이 기록을 저장하는 순서를 맡습니다.
public class AnswerService {

    private final QuestionRepository questionRepository;
    private final AnswerAttemptRepository answerAttemptRepository;

    public AnswerService(
            QuestionRepository questionRepository,
            AnswerAttemptRepository answerAttemptRepository
    ) {
        this.questionRepository = questionRepository;
        this.answerAttemptRepository = answerAttemptRepository;
    }

    @Transactional
    public AnswerResult submit(SubmitAnswerRequest request) {
        Question question = questionRepository.findById(request.questionId())
                .orElseThrow(() -> new QuestionNotFoundException(request.questionId()));
        AnswerAttempt attempt = AnswerAttempt.record(question, request.choiceId());
        answerAttemptRepository.save(attempt);
        return AnswerResult.from(question, attempt, request.choiceId());
    }

    public QuizStats findStats() {
        long answeredCount = answerAttemptRepository.count();
        long correctCount = answerAttemptRepository.countByCorrectTrue();
        return QuizStats.of(answeredCount, correctCount);
    }
}
