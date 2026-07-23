public class CartItem {
    private Menu menu;
    private int quantity;

    public CartItem(Menu menu, int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("수량은 1개 이상이어야 합니다.");
        this.menu = menu;
        this.quantity = quantity;
    }

    boolean hasMenuName(String name) { return menu.getName().equals(name); }
    void addQuantity(int added) {
        if (added <= 0) throw new IllegalArgumentException("수량은 1개 이상이어야 합니다.");
        quantity = quantity + added;
    }
    int totalPrice() { return menu.priceFor(quantity); }
    void printInfo() {
        System.out.println(menu.getName() + " " + quantity + "개: " + totalPrice() + "원");
    }
}