public class Menu {
    // 이 세 값은 Menu 안에서만 직접 사용할 수 있습니다.
    private String name;
    private int price;
    private boolean soldOut;

    public Menu(String name, int price) {
        // 가격이 0 이하이면 저장하지 않고 여기서 멈춥니다.
        if (price <= 0) {
            throw new IllegalArgumentException("가격은 1원 이상이어야 합니다.");
        }
        this.name = name;
        this.price = price;
        this.soldOut = false;
    }

    String getName() {
        // 다른 클래스가 이름을 요청하면 현재 이름을 돌려줍니다.
        return name;
    }

    void markSoldOut() {
        soldOut = true;
    }

    boolean isSoldOut() {
        return soldOut;
    }

    void printInfo() {
        System.out.print(name + " " + price + "원");
        if (isSoldOut()) {
            System.out.print(" (품절)");
        }
        System.out.println();
    }

    int priceFor(int quantity) {
        return price * quantity;
    }
}