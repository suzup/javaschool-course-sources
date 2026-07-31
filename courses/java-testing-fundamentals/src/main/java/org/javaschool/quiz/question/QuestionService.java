package org.javaschool.quiz.question;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
// Repository에서 문제를 찾고, 저장용 Entity를 브라우저용 응답으로 바꾸는 순서를 맡습니다.
public class QuestionService {

    // 문제를 실제 MySQL에서 찾으려면 DB 창구인 Repository가 필요합니다.
    private final QuestionRepository questionRepository;

    // Spring이 만들어 둔 QuestionRepository를 이 Service에 연결합니다.
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // 모든 문제 Entity를 id 순서로 읽고, 정답이 없는 응답 DTO 목록으로 바꿉니다.
    public QuestionListResponse findAll() {
        List<QuestionResponse> questions = questionRepository.findAllByOrderByIdAsc().stream()
                // Question Entity 하나마다 QuestionResponse.from을 실행합니다.
                .map(QuestionResponse::from)
                .toList();

        // 문제 목록과 전체 개수를 같은 응답에 담습니다.
        return new QuestionListResponse(questions, questions.size());
    }

    // 문제 번호 하나로 Entity를 찾고 브라우저에 공개할 응답으로 바꿉니다.
    public QuestionResponse findById(Long id) {
        Question question = questionRepository.findById(id)
                // 해당 id가 없으면 null 대신 알아볼 수 있는 404용 실패를 발생시킵니다.
                .orElseThrow(() -> new QuestionNotFoundException(id));

        // 정답과 해설을 제외한 문제 문장과 선택지만 응답으로 만듭니다.
        return QuestionResponse.from(question);
    }
}
