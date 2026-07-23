package org.javaschool.quiz.question;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz/questions")
// 브라우저의 문제 조회 요청을 문제 기능에 연결합니다.
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public QuestionListResponse findAll() {
        return questionService.findAll();
    }

    @GetMapping("/{id}")
    public QuestionDataResponse findById(@PathVariable Long id) {
        return new QuestionDataResponse(questionService.findById(id));
    }
}
