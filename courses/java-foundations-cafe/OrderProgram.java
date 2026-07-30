import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.Scanner;

public class OrderProgram {
    // Main이 프로그램을 시작하면 이 주문 흐름이 움직입니다.
    static void run() {
        Scanner scanner = new Scanner(System.in);

        ArrayList<Menu> menus = new ArrayList<>();
        Menu americano = new Menu("아메리카노", 3000);
        Menu cafeLatte = new Menu("카페라떼", 4000);
        cafeLatte.markSoldOut();
        Menu vanillaLatte = new Menu("바닐라라떼", 4500);

        menus.add(americano);
        menus.add(cafeLatte);
        menus.add(vanillaLatte);

        Cart cart = new Cart();

        printMenu(menus);
        while (true) {
            try {
                System.out.print("메뉴 번호: ");
                int menuNumber = scanner.nextInt();
                if (menuNumber == 4) break;

                Menu selected = selectMenu(menuNumber, menus);
                if (selected == null) {
                    System.out.println("없는 메뉴 번호입니다.");
                    continue;
                }
                if (selected.isSoldOut()) {
                    System.out.println(selected.getName() + "는 품절입니다.");
                    continue;
                }

                System.out.print("수량: ");
                int quantity = scanner.nextInt();
                cart.add(selected, quantity);
                System.out.println(selected.getName() + " " + quantity + "개를 담았습니다.");
            } catch (InputMismatchException error) {
                System.out.println("숫자로 입력해 주세요.");
                scanner.next();
            } catch (IllegalArgumentException error) {
                System.out.println("주문 거절: 수량은 1개 이상이어야 합니다.");
            }
        }
        cart.completeOrder();
    }

    // 화면 번호에 해당하는 메뉴를 목록에서 찾아 돌려줍니다.
    static Menu selectMenu(int number, ArrayList<Menu> menus) {
        if (number < 1 || number > menus.size()) return null;
        return menus.get(number - 1);
    }

    // 메뉴판 문장은 목록에 담긴 메뉴에서 그대로 만듭니다.
    static void printMenu(ArrayList<Menu> menus) {
        System.out.println("[카페 스쿨 메뉴]");
        System.out.println("메뉴를 입력해 주세요.");
        int number = 1;
        for (Menu menu : menus) {
            System.out.print(number + ". ");
            menu.printInfo();
            number = number + 1;
        }
        System.out.println("4. 주문 완료");
    }
}