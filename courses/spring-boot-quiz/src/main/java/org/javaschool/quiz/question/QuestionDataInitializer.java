package org.javaschool.quiz.question;

import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
// 처음 실행한 빈 DB에 강의에서 사용할 Java 문제 다섯 개를 넣습니다.
public class QuestionDataInitializer implements ApplicationRunner {

    private final QuestionRepository questionRepository;

    public QuestionDataInitializer(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (questionRepository.count() > 0) {
            return;
        }

        questionRepository.saveAll(List.of(
                Question.create(
                        "Java에서 정수를 저장할 때 사용하는 자료형은 무엇일까요?",
                        "String", "int", "boolean", "char", 2,
                        "int는 소수점이 없는 정수를 저장하는 Java의 기본 자료형입니다."
                ),
                Question.create(
                        "참 또는 거짓 두 값 중 하나를 저장하는 자료형은 무엇일까요?",
                        "double", "String", "boolean", "long", 3,
                        "boolean에는 true 또는 false만 저장할 수 있습니다."
                ),
                Question.create(
                        "같은 코드를 정해진 횟수만큼 반복할 때 알맞은 문장은 무엇일까요?",
                        "if 문", "for 문", "switch 문", "return 문", 2,
                        "for 문은 반복 횟수를 정해 같은 코드를 여러 번 실행할 때 사용합니다."
                ),
                Question.create(
                        "여러 값을 순서대로 한곳에 저장할 때 사용할 수 있는 것은 무엇일까요?",
                        "배열", "주석", "조건문", "출력문", 1,
                        "배열은 같은 종류의 여러 값을 순서대로 저장하고 번호로 꺼내 볼 수 있게 합니다."
                ),
                Question.create(
                        "클래스로 만든 실제 대상을 무엇이라고 할까요?",
                        "변수", "메서드", "객체", "매개변수", 3,
                        "클래스에 정한 구조를 바탕으로 실제 값을 가진 대상을 객체라고 합니다."
                )
        ));
    }
}
