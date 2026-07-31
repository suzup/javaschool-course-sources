package org.javaschool.quiz.answer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.javaschool.quiz.auth.CurrentMemberProvider;
import org.javaschool.quiz.auth.ForbiddenException;
import org.javaschool.quiz.member.StudyMember;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private final CurrentMemberProvider currentMemberProvider;

    // Spring이 만들어 둔 AnswerService와 로그인 확인 도구를 이 Controller에 연결합니다.
    public AnswerController(AnswerService answerService, CurrentMemberProvider currentMemberProvider) {
        this.answerService = answerService;
        this.currentMemberProvider = currentMemberProvider;
    }

    // POST JSON을 SubmitAnswerRequest로 읽고 값의 범위를 먼저 검증합니다.
    @PostMapping("/answers")
    public AnswerDataResponse submit(
            @Valid @RequestBody SubmitAnswerRequest request,
            HttpServletRequest servletRequest
    ) {
        // 로그인한 사람만 답을 제출할 수 있습니다. 로그인 정보가 없으면 여기서 401로 끝납니다.
        StudyMember member = currentMemberProvider.require(servletRequest);
        // Service가 채점하고 저장한 결과만 API의 data 속성 안에 담습니다.
        return new AnswerDataResponse(answerService.submit(request, member));
    }

    // 로그인한 사람의 누적 기록만 돌려줍니다.
    @GetMapping("/me/stats")
    public QuizStatsDataResponse myStats(HttpServletRequest servletRequest) {
        StudyMember member = currentMemberProvider.require(servletRequest);
        return new QuizStatsDataResponse(answerService.findStatsOf(member));
    }

    // 주소에 적힌 회원의 기록은 그 사람 자신만 볼 수 있습니다.
    @GetMapping("/members/{memberId}/stats")
    public QuizStatsDataResponse memberStats(@PathVariable long memberId, HttpServletRequest servletRequest) {
        StudyMember member = currentMemberProvider.require(servletRequest);
        if (member.getId() != memberId) {
            throw new ForbiddenException();
        }
        return new QuizStatsDataResponse(answerService.findStatsOf(member));
    }

    // GET /api/quiz/stats 요청이 오면 MySQL 누적 통계를 돌려줍니다.
    @GetMapping("/stats")
    public QuizStatsDataResponse stats() {
        return new QuizStatsDataResponse(answerService.findStats());
    }
}
