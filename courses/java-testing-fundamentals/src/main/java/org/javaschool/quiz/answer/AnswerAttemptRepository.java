package org.javaschool.quiz.answer;

import org.springframework.data.jpa.repository.JpaRepository;

// 풀이 기록을 저장하고 전체 제출 수와 정답 수를 셉니다.
public interface AnswerAttemptRepository extends JpaRepository<AnswerAttempt, Long> {

    long countByCorrectTrue();
}
