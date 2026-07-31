package org.javaschool.quiz.auth;

// 서명은 맞지만 사용할 수 있는 시간이 지난 토큰입니다.
public class TokenExpiredException extends RuntimeException {

    public TokenExpiredException() {
        super("로그인 시간이 지났습니다. 다시 로그인해 주세요.");
    }
}
