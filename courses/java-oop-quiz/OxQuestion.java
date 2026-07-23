// OX 문제 한 개가 질문, 정답과 해설을 기억하도록 정한 클래스입니다.
public class OxQuestion implements Question {
    private final String text;
    private final String correctAnswer;
    private final String explanation;

    public OxQuestion(String text, String correctAnswer, String explanation) {
        String normalizedAnswer = correctAnswer.toUpperCase();
        if (!normalizedAnswer.equals("O") && !normalizedAnswer.equals("X")) {
            throw new IllegalArgumentException("OX 문제의 정답은 O 또는 X여야 합니다.");
        }

        this.text = text;
        this.correctAnswer = normalizedAnswer;
        this.explanation = explanation;
    }

    @Override
    public void show(int number) {
        System.out.println(number + "번 문제");
        System.out.println(text);
        System.out.println("O 또는 X를 입력해 주세요.");
    }

    @Override
    public boolean accepts(String answer) {
        String normalizedAnswer = answer.toUpperCase();
        return normalizedAnswer.equals("O") || normalizedAnswer.equals("X");
    }

    @Override
    public boolean isCorrect(String answer) {
        return correctAnswer.equals(answer.toUpperCase());
    }

    @Override
    public String invalidAnswerMessage() {
        return "O 또는 X로 답해 주세요.";
    }

    @Override
    public String correctAnswer() {
        return correctAnswer;
    }

    @Override
    public String explanation() {
        return explanation;
    }
}
