package org.javaschool.quiz.auth;

import org.javaschool.quiz.member.MemberService;
import org.javaschool.quiz.member.StudyMember;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Component
// 요청을 보낸 사람이 누구인지 한 곳에서 찾습니다. 머리글의 토큰을 먼저 보고, 없으면 세션을 봅니다.
public class CurrentMemberProvider {

    public static final String SESSION_KEY = "memberId";
    private static final String BEARER = "Bearer ";

    private final MemberService memberService;
    private final TokenService tokenService;

    public CurrentMemberProvider(MemberService memberService, TokenService tokenService) {
        this.memberService = memberService;
        this.tokenService = tokenService;
    }

    public StudyMember require(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith(BEARER)) {
            long memberId = tokenService.readMemberId(authorization.substring(BEARER.length()));
            return memberService.findById(memberId);
        }
        return fromSession(request);
    }

    private StudyMember fromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new LoginRequiredException();
        }
        Object memberId = session.getAttribute(SESSION_KEY);
        if (memberId == null) {
            throw new LoginRequiredException();
        }
        return memberService.findById((Long) memberId);
    }
}
