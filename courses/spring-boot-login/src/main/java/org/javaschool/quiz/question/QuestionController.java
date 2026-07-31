package org.javaschool.quiz.question;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz/questions")
// 브라우저의 문제 조회 요청을 받아 QuestionService의 조회 기능에 연결합니다.
public class QuestionController {

    // Controller는 DB를 직접 읽지 않고 문제 조회 순서를 맡은 Service를 사용합니다.
    private final QuestionService questionService;

    // Spring이 만들어 둔 QuestionService를 이 Controller에 연결합니다.
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // GET /api/quiz/questions 요청이 오면 전체 문제 목록을 돌려줍니다.
    @GetMapping
    public QuestionListResponse findAll() {
        return questionService.findAll();
    }

    // URL 끝의 문제 번호를 Java의 id 값으로 받아 한 문제를 조회합니다.
    @GetMapping("/{id}")
    public QuestionDataResponse findById(@PathVariable Long id) {
        // Service가 찾은 공개용 문제를 API의 data 속성 안에 담습니다.
        return new QuestionDataResponse(questionService.findById(id));
    }
}
