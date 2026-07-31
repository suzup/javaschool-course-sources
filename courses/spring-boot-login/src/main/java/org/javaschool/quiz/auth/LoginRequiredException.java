package org.javaschool.quiz.auth;

// 로그인한 사람만 할 수 있는 요청에 로그인 정보가 없는 경우입니다.
public class LoginRequiredException extends RuntimeException {

    public LoginRequiredException() {
        super("로그인이 필요합니다.");
    }
}
