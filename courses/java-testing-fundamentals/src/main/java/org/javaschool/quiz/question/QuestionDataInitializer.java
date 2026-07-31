package org.javaschool.quiz.question;

import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
// 서버 시작 준비가 끝난 뒤, 빈 문제 테이블에 수업용 기본 문제를 한 번 넣습니다.
public class QuestionDataInitializer implements ApplicationRunner {

    // 문제 수를 확인하고 여러 문제를 저장하려면 DB 창구인 Repository가 필요합니다.
    private final QuestionRepository questionRepository;

    // Spring이 만들어 둔 QuestionRepository를 이 시작 작업에 연결합니다.
    public QuestionDataInitializer(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        // 문제가 하나라도 있으면 이미 사용 중인 DB로 보고 기본 문제를 다시 넣지 않습니다.
        // 이 검사가 없으면 서버를 다시 켤 때마다 같은 문제가 5개씩 중복됩니다.
        if (questionRepository.count() > 0) {
            return;
        }

        // 빈 DB일 때만 다섯 문제를 한 번에 저장합니다.
        // @Transactional 덕분에 이 저장 작업은 하나의 DB 작업 범위에서 처리됩니다.
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
