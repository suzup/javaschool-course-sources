package org.javaschool.quiz.auth;

// 로그인은 했지만 그 자료를 볼 권한이 없는 경우입니다.
public class ForbiddenException extends RuntimeException {

    public ForbiddenException() {
        super("다른 사람의 기록은 볼 수 없습니다.");
    }
}
