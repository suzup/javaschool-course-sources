package org.javaschool.quiz.question;

// 요청한 번호의 문제가 없다는 실패를 나타냅니다.
public class QuestionNotFoundException extends RuntimeException {

    public QuestionNotFoundException(Long id) {
        super("해당 번호의 퀴즈 문제가 없습니다: " + id);
    }
}
