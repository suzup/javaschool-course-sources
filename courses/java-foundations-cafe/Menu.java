public class Menu {
    private String name;
    private int price;
    private boolean soldOut;

    public Menu(String name, int price) {
        if (price <= 0) throw new IllegalArgumentException("가격은 1원 이상이어야 합니다.");
        this.name = name;
        this.price = price;
        this.soldOut = false;
    }

    String getName() { return name; }
    void markSoldOut() { soldOut = true; }
    boolean isSoldOut() { return soldOut; }
    int priceFor(int quantity) { return price * quantity; }
}