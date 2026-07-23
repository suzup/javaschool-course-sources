package org.javaschool.quiz.answer;

import java.time.LocalDateTime;

import org.javaschool.quiz.question.Question;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "answer_attempt")
// 사용자가 제출한 문제, 선택 번호와 정답 여부를 MySQL에 한 건씩 저장합니다.
public class AnswerAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(nullable = false)
    private int selectedChoiceId;

    @Column(nullable = false)
    private boolean correct;

    @Column(nullable = false)
    private LocalDateTime answeredAt;

    protected AnswerAttempt() {
    }

    private AnswerAttempt(Question question, int selectedChoiceId, boolean correct) {
        this.question = question;
        this.selectedChoiceId = selectedChoiceId;
        this.correct = correct;
        this.answeredAt = LocalDateTime.now();
    }

    public static AnswerAttempt record(Question question, int selectedChoiceId) {
        return new AnswerAttempt(question, selectedChoiceId, question.isCorrect(selectedChoiceId));
    }

    public boolean isCorrect() {
        return correct;
    }
}
