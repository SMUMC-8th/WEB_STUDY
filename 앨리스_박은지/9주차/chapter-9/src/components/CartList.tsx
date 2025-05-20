import CartItem from "./CartItem";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();
  const { clearCart } = useCartActions();

  const handleAllClearButton = () => {
    clearCart();
  };
  <div className="flex flex-col items-center justify-center">
    <ul>
      {cartItems.map((item) => (
        <CartItem key={item.id} lp={item} />
      ))}
    </ul>
    <button
      onClick={handleAllClearButton}
      className="p-4 border rounded-md my-10"
    >
      전체 삭제
    </button>
  </div>;
};
export default CartList;
