package org.javaschool.quiz.answer;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
// 브라우저의 정답 제출과 누적 통계 요청을 퀴즈 기능에 연결합니다.
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping("/answers")
    public AnswerDataResponse submit(@Valid @RequestBody SubmitAnswerRequest request) {
        return new AnswerDataResponse(answerService.submit(request));
    }

    @GetMapping("/stats")
    public QuizStatsDataResponse stats() {
        return new QuizStatsDataResponse(answerService.findStats());
    }
}
