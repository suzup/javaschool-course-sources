package org.javaschool.quiz.answer;

import java.time.LocalDateTime;

import org.javaschool.quiz.member.StudyMember;
import org.javaschool.quiz.question.Question;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "answer_attempt")
// 사용자가 제출한 문제, 선택 번호, 판정 결과와 시간을 MySQL에 한 건씩 저장합니다.
public class AnswerAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 여러 풀이 기록이 같은 문제 하나를 가리킬 수 있습니다.
    @ManyToOne(optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // 이 기록을 남긴 스터디원입니다. 로그인한 사람만 제출할 수 있으므로 비워 둘 수 없습니다.
    @ManyToOne(optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private StudyMember member;

    @Column(nullable = false)
    private int selectedChoiceId;

    @Column(nullable = false)
    private boolean correct;

    @Column(nullable = false)
    private LocalDateTime answeredAt;

    // JPA가 DB 행을 AnswerAttempt 객체로 복원할 때 사용합니다.
    protected AnswerAttempt() {
    }

    private AnswerAttempt(Question question, StudyMember member, int selectedChoiceId, boolean correct) {
        this.question = question;
        this.member = member;
        this.selectedChoiceId = selectedChoiceId;
        this.correct = correct;
        this.answeredAt = LocalDateTime.now();
    }

    // 브라우저가 정답 여부를 보내게 하지 않고 서버의 Question으로 직접 판정합니다.
    public static AnswerAttempt record(Question question, StudyMember member, int selectedChoiceId) {
        boolean correct = question.isCorrect(selectedChoiceId);
        return new AnswerAttempt(question, member, selectedChoiceId, correct);
    }

    public boolean isCorrect() {
        return correct;
    }
}
