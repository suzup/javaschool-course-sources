package org.javaschool.quiz.member;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "study_member")
// 스터디원 한 명이 study_member 표의 한 행으로 저장됩니다.
public class StudyMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 같은 이름을 두 번 만들 수 없게 표에서 막습니다.
    @Column(nullable = false, length = 40, unique = true)
    private String name;

    // 비밀번호 원문이 아니라 해시만 저장합니다.
    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    @Column(name = "joined_at", nullable = false)
    private LocalDate joinedAt;

    protected StudyMember() {
    }

    private StudyMember(String name, String passwordHash) {
        this.name = name;
        this.passwordHash = passwordHash;
        this.joinedAt = LocalDate.now();
    }

    public static StudyMember join(String name, String passwordHash) {
        return new StudyMember(name, passwordHash);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public LocalDate getJoinedAt() {
        return joinedAt;
    }
}
