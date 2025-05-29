import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";
import ClearModal from "./ClearModal";
import { useState } from "react";

const CartList = () => {
  const { cartItems } = useCartInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-3 border border-gray-400 hover:bg-gray-400 hover:text-white text-gray-500 rounded-3xl my-8"
      >
        전체 삭제
      </button>
      {isModalOpen && <ClearModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
export default CartList;
