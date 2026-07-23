import java.util.ArrayList;
import java.util.Scanner;

// 퀴즈 문제를 준비하고 게임을 시작하는 클래스입니다.
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        QuizGame game = new QuizGame(createQuestions());

        System.out.println("직접 만들고 플레이하는 Java 퀴즈");
        String nickname = readNickname(scanner);

        boolean playAgain = true;
        while (playAgain) {
            game.play(scanner, nickname);
            playAgain = askToPlayAgain(scanner);
        }

        System.out.println("퀴즈를 종료합니다. 다음에 또 도전해 주세요!");
        scanner.close();
    }

    private static ArrayList<Question> createQuestions() {
        ArrayList<Question> questions = new ArrayList<>();

        questions.add(new ChoiceQuestion(
                "조건이 참일 때만 코드를 실행하는 Java 키워드는 무엇일까요?",
                new String[]{"for", "if", "new"},
                2,
                "if는 조건이 참일 때 중괄호 안의 코드를 실행합니다."
        ));

        questions.add(new OxQuestion(
                "ArrayList는 값을 한 개만 저장할 수 있다.",
                "X",
                "ArrayList에는 여러 값을 차례로 추가할 수 있습니다."
        ));

        questions.add(new ChoiceQuestion(
                "객체를 만들 때 처음 필요한 값을 받는 특별한 메서드는 무엇일까요?",
                new String[]{"조건문", "반복문", "생성자"},
                3,
                "생성자는 new로 객체를 만들 때 필요한 값을 받아 필드를 준비합니다."
        ));

        questions.add(new OxQuestion(
                "private 필드는 그 필드를 선언한 클래스 안에서 사용할 수 있다.",
                "O",
                "private은 같은 클래스 안에서는 사용할 수 있고, 다른 클래스의 직접 접근을 막습니다."
        ));

        questions.add(new ChoiceQuestion(
                "두 String의 글자 내용이 같은지 비교할 때 사용하는 메서드는 무엇일까요?",
                new String[]{"equals", "add", "println"},
                1,
                "String의 글자 내용을 비교할 때는 equals를 사용합니다."
        ));

        return questions;
    }

    private static String readNickname(Scanner scanner) {
        while (true) {
            System.out.print("닉네임을 입력해 주세요: ");
            String nickname = scanner.nextLine().trim();

            if (!nickname.isEmpty()) {
                return nickname;
            }
            System.out.println("한 글자 이상의 닉네임을 입력해 주세요.");
        }
    }

    private static boolean askToPlayAgain(Scanner scanner) {
        while (true) {
            System.out.print("다시 도전할까요? (Y/N): ");
            String answer = scanner.nextLine().trim();

            if (answer.equalsIgnoreCase("Y")) {
                return true;
            }
            if (answer.equalsIgnoreCase("N")) {
                return false;
            }
            System.out.println("Y 또는 N으로 답해 주세요.");
        }
    }
}
