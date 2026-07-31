package org.javaschool.quiz.answer;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
// 브라우저의 정답 제출과 누적 통계 요청을 AnswerService에 연결합니다.
public class AnswerController {

    // Controller는 직접 채점하거나 DB에 저장하지 않고 처리 순서를 Service에 맡깁니다.
    private final AnswerService answerService;

    // Spring이 만들어 둔 AnswerService를 이 Controller에 연결합니다.
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // POST JSON을 SubmitAnswerRequest로 읽고 값의 범위를 먼저 검증합니다.
    @PostMapping("/answers")
    public AnswerDataResponse submit(@Valid @RequestBody SubmitAnswerRequest request) {
        // Service가 채점하고 저장한 결과만 API의 data 속성 안에 담습니다.
        return new AnswerDataResponse(answerService.submit(request));
    }

    // GET /api/quiz/stats 요청이 오면 MySQL 누적 통계를 돌려줍니다.
    @GetMapping("/stats")
    public QuizStatsDataResponse stats() {
        return new QuizStatsDataResponse(answerService.findStats());
    }
}
