package org.javaschool.quiz.question;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
// 문제 목록과 한 문제를 조회하는 순서를 맡습니다.
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public QuestionListResponse findAll() {
        List<QuestionResponse> questions = questionRepository.findAllByOrderByIdAsc().stream()
                .map(QuestionResponse::from)
                .toList();
        return new QuestionListResponse(questions, questions.size());
    }

    public QuestionResponse findById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
        return QuestionResponse.from(question);
    }
}
