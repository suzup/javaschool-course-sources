package org.javaschool.quiz.member;

import org.javaschool.quiz.auth.CurrentMemberProvider;
import org.javaschool.quiz.auth.TokenService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
// 가입과 로그인 요청을 받습니다.
public class MemberController {

    private final MemberService memberService;
    private final CurrentMemberProvider currentMemberProvider;
    private final TokenService tokenService;

    public MemberController(
            MemberService memberService,
            CurrentMemberProvider currentMemberProvider,
            TokenService tokenService
    ) {
        this.memberService = memberService;
        this.currentMemberProvider = currentMemberProvider;
        this.tokenService = tokenService;
    }

    @PostMapping("/api/quiz/signup")
    public MemberDataResponse signup(@Valid @RequestBody SignupRequest request) {
        return new MemberDataResponse(memberService.signup(request));
    }

    @PostMapping("/api/quiz/login")
    public LoginDataResponse login(@Valid @RequestBody LoginRequest request, HttpServletRequest servletRequest) {
        StudyMember member = memberService.login(request);
        // 로그인한 사람의 번호를 세션에 적어 둡니다. 브라우저는 세션 번호를 쿠키로 받습니다.
        servletRequest.getSession(true).setAttribute(CurrentMemberProvider.SESSION_KEY, member.getId());
        // 쿠키를 쓸 수 없는 화면을 위해 같은 사람을 가리키는 토큰도 함께 돌려줍니다.
        String token = tokenService.issue(member.getId());
        return new LoginDataResponse(new LoginResponse(MemberResponse.from(member), token));
    }

    @PostMapping("/api/quiz/logout")
    public LogoutResponse logout(HttpServletRequest servletRequest) {
        HttpSession session = servletRequest.getSession(false);
        if (session != null) {
            // 서버가 들고 있던 로그인 상태를 지웁니다. 쿠키는 남아 있어도 가리킬 자리가 없습니다.
            session.invalidate();
        }
        return new LogoutResponse("로그아웃했습니다. 발급한 토큰은 만료 시각까지 그대로 쓸 수 있습니다.");
    }

    @GetMapping("/api/quiz/me")
    public MemberDataResponse me(HttpServletRequest servletRequest) {
        // 요청에 담겨 온 로그인 정보로 지금 누가 부르는지 찾습니다.
        StudyMember member = currentMemberProvider.require(servletRequest);
        return new MemberDataResponse(MemberResponse.from(member));
    }
}
