package org.javaschool.quiz.member;

// 이미 있는 이름으로 가입하려 한 예상 가능한 실패입니다.
public class MemberNameTakenException extends RuntimeException {

    public MemberNameTakenException(String name) {
        super("이미 있는 이름입니다: " + name);
    }
}
