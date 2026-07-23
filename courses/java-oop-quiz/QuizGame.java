import java.util.ArrayList;
import java.util.Scanner;

// 여러 문제의 답을 모은 뒤 정답 여부와 최종 점수를 보여 주는 클래스입니다.
public class QuizGame {
    private final ArrayList<Question> questions;

    public QuizGame(ArrayList<Question> questions) {
        if (questions.isEmpty()) {
            throw new IllegalArgumentException("퀴즈에는 문제가 한 개 이상 필요합니다.");
        }
        this.questions = questions;
    }

    public void play(Scanner scanner, String nickname) {
        ArrayList<String> answers = new ArrayList<>();

        System.out.println();
        System.out.println("================================");
        System.out.println(nickname + "님의 Java 퀴즈를 시작합니다.");
        System.out.println("총 " + questions.size() + "문제입니다.");
        System.out.println("================================");

        for (int index = 0; index < questions.size(); index++) {
            Question question = questions.get(index);

            System.out.println();
            question.show(index + 1);
            String answer = readAnswer(scanner, question);
            answers.add(answer);
            System.out.println("답을 저장했습니다.");
        }

        showResults(nickname, answers);
    }

    private String readAnswer(Scanner scanner, Question question) {
        while (true) {
            System.out.print("답: ");
            String answer = scanner.nextLine().trim();

            if (question.accepts(answer)) {
                return answer;
            }
            System.out.println(question.invalidAnswerMessage());
        }
    }

    private void showResults(String nickname, ArrayList<String> answers) {
        int correctCount = 0;

        System.out.println();
        System.out.println("================================");
        System.out.println(nickname + "님의 채점 결과");
        System.out.println("================================");

        for (int index = 0; index < questions.size(); index++) {
            Question question = questions.get(index);
            String answer = answers.get(index);
            boolean correct = question.isCorrect(answer);
            String result;

            if (correct) {
                correctCount++;
                result = "정답";
            } else {
                result = "오답";
            }

            System.out.println();
            System.out.println((index + 1) + "번: " + result);
            System.out.println("내 답: " + answer);
            System.out.println("정답: " + question.correctAnswer());
            System.out.println("해설: " + question.explanation());
        }

        int score = correctCount * 100 / questions.size();

        System.out.println();
        System.out.println("================================");
        System.out.println("맞힌 문제: " + correctCount + "/" + questions.size());
        System.out.println("점수: " + score + "점");
        System.out.println(resultMessage(score));
        System.out.println("================================");
    }

    private String resultMessage(int score) {
        if (score == 100) {
            return "완벽합니다! 모든 문제를 맞혔습니다.";
        }
        if (score >= 60) {
            return "좋습니다! 틀린 문제의 해설도 다시 확인해 보세요.";
        }
        return "괜찮습니다. 다시 도전하면 더 많이 맞힐 수 있습니다.";
    }
}
