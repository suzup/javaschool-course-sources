// 퀴즈 게임이 문제 종류와 관계없이 같은 방법으로 질문하도록 정한 약속입니다.
public interface Question {
    void show(int number);

    boolean accepts(String answer);

    boolean isCorrect(String answer);

    String invalidAnswerMessage();

    String correctAnswer();

    String explanation();
}
