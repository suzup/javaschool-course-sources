package org.javaschool.quiz.question;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "quiz_question")
// 객관식 문제 한 개와 네 선택지, 정답과 해설을 MySQL에 저장합니다.
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_text", nullable = false, length = 300)
    private String questionText;

    @Column(nullable = false, length = 120)
    private String choice1;

    @Column(nullable = false, length = 120)
    private String choice2;

    @Column(nullable = false, length = 120)
    private String choice3;

    @Column(nullable = false, length = 120)
    private String choice4;

    @Column(nullable = false)
    private int correctChoiceId;

    @Column(nullable = false, length = 500)
    private String explanation;

    protected Question() {
    }

    private Question(
            String questionText,
            String choice1,
            String choice2,
            String choice3,
            String choice4,
            int correctChoiceId,
            String explanation
    ) {
        this.questionText = questionText;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.correctChoiceId = correctChoiceId;
        this.explanation = explanation;
    }

    public static Question create(
            String questionText,
            String choice1,
            String choice2,
            String choice3,
            String choice4,
            int correctChoiceId,
            String explanation
    ) {
        if (correctChoiceId < 1 || correctChoiceId > 4) {
            throw new IllegalArgumentException("정답 번호는 1부터 4까지여야 합니다.");
        }
        return new Question(questionText, choice1, choice2, choice3, choice4, correctChoiceId, explanation);
    }

    public boolean isCorrect(int selectedChoiceId) {
        return correctChoiceId == selectedChoiceId;
    }

    public List<String> choices() {
        return List.of(choice1, choice2, choice3, choice4);
    }

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public int getCorrectChoiceId() {
        return correctChoiceId;
    }

    public String getExplanation() {
        return explanation;
    }
}
