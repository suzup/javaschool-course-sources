package org.javaschool.quiz.question;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// 문제를 MySQL에 저장하고 번호 순서로 다시 찾는 기능을 제공합니다.
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findAllByOrderByIdAsc();
}
