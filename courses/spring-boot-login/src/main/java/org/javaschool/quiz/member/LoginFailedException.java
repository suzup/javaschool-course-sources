package org.javaschool.quiz.member;

// 이름이 없거나 비밀번호가 다른 경우입니다. 둘을 구분해 알리지 않습니다.
public class LoginFailedException extends RuntimeException {

    public LoginFailedException() {
        super("이름 또는 비밀번호가 맞지 않습니다.");
    }
}
