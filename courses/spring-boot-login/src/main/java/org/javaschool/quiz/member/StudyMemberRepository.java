package org.javaschool.quiz.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

// 스터디원 행을 MySQL에서 찾고 저장하는 창구입니다.
public interface StudyMemberRepository extends JpaRepository<StudyMember, Long> {

    Optional<StudyMember> findByName(String name);

    boolean existsByName(String name);
}
