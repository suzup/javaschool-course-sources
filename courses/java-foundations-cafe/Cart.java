import java.util.ArrayList;

public class Cart {
    private ArrayList<CartItem> items = new ArrayList<>();

    void add(Menu menu, int quantity) {
        CartItem found = findByMenuName(menu.getName());
        if (found == null) items.add(new CartItem(menu, quantity));
        else found.addQuantity(quantity);
    }

    CartItem findByMenuName(String name) {
        for (CartItem item : items) {
            if (item.hasMenuName(name)) return item;
        }
        return null;
    }

    int totalPrice() {
        int total = 0;
        for (CartItem item : items) total = total + item.totalPrice();
        return total;
    }

    void completeOrder() {
        System.out.println("[주문 결과]");
        if (items.isEmpty()) {
            System.out.println("장바구니가 비어 주문을 완료할 수 없습니다.");
            return;
        }
        for (CartItem item : items) item.printInfo();
        System.out.println("총 주문 금액: " + totalPrice() + "원");
        System.out.println("주문을 완료했습니다.");
    }
}