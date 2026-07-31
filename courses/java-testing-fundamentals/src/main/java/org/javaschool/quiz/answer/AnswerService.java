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

    // 답 제출의 문제 조회, 서버 채점, 기록 저장과 응답 생성을 한 작업 범위로 처리합니다.
    @Transactional
    public AnswerResult submit(SubmitAnswerRequest request) {
        // 1. 요청의 문제 번호로 MySQL에서 실제 문제를 찾습니다.
        Question question = questionRepository.findById(request.questionId())
                .orElseThrow(() -> new QuestionNotFoundException(request.questionId()));

        // 2. 서버에 저장된 정답으로 판정한 풀이 기록 객체를 만듭니다.
        AnswerAttempt attempt = AnswerAttempt.record(question, request.choiceId());

        // 3. 판정 결과를 answer_attempt 한 행으로 저장합니다.
        answerAttemptRepository.save(attempt);

        // 4. 저장용 Entity에서 브라우저에 공개할 결과만 만들어 돌려줍니다.
        return AnswerResult.from(question, attempt, request.choiceId());
    }

    // 저장된 모든 풀이 행을 세어 누적 제출 수, 정답 수와 정답률을 만듭니다.
    public QuizStats findStats() {
        long answeredCount = answerAttemptRepository.count();
        long correctCount = answerAttemptRepository.countByCorrectTrue();
        return QuizStats.of(answeredCount, correctCount);
    }
}
