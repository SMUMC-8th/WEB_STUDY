import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import type { RootState } from "../store/store"; // store 경로 확인

function CartList() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const filteredItems = cartItems.filter((item) => item.amount > 0);

  return (
    <div className="flex pt-[100px] flex-col items-center justify-center">
      {filteredItems.map((item) => (
        <CartItem key={item.id} lp={{ ...item, price: Number(item.price) }} />
      ))}
    </div>
  );
}

export default CartList;
