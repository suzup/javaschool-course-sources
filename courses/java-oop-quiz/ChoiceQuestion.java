// 객관식 문제 한 개가 질문, 보기, 정답과 해설을 기억하도록 정한 클래스입니다.
public class ChoiceQuestion implements Question {
    private final String text;
    private final String[] choices;
    private final int correctChoice;
    private final String explanation;

    public ChoiceQuestion(String text, String[] choices, int correctChoice, String explanation) {
        if (choices.length < 2) {
            throw new IllegalArgumentException("객관식 보기에는 두 개 이상의 항목이 필요합니다.");
        }
        if (correctChoice < 1 || correctChoice > choices.length) {
            throw new IllegalArgumentException("정답 번호가 보기 범위를 벗어났습니다.");
        }

        this.text = text;
        this.choices = choices;
        this.correctChoice = correctChoice;
        this.explanation = explanation;
    }

    @Override
    public void show(int number) {
        System.out.println(number + "번 문제");
        System.out.println(text);
        for (int index = 0; index < choices.length; index++) {
            System.out.println((index + 1) + ". " + choices[index]);
        }
    }

    @Override
    public boolean accepts(String answer) {
        try {
            int choice = Integer.parseInt(answer);
            return choice >= 1 && choice <= choices.length;
        } catch (NumberFormatException error) {
            return false;
        }
    }

    @Override
    public boolean isCorrect(String answer) {
        return Integer.parseInt(answer) == correctChoice;
    }

    @Override
    public String invalidAnswerMessage() {
        return "1부터 " + choices.length + " 사이의 번호를 입력해 주세요.";
    }

    @Override
    public String correctAnswer() {
        return correctChoice + ". " + choices[correctChoice - 1];
    }

    @Override
    public String explanation() {
        return explanation;
    }
}
