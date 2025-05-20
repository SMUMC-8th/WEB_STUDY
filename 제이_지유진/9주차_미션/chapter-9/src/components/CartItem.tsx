// CartItem.tsx
import { useDispatch } from "react-redux";
import { addToCart, decreaseAmount, calculateTotal } from "../slices/cartSlice";
import type { LP } from "../types/cart";

interface CartItemProps {
  lp: LP;
}

function CartItem({ lp }: CartItemProps) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(addToCart(lp)); // 전체 LP 객체 전달
    dispatch(calculateTotal());
  };

  const handleDecrease = () => {
    dispatch(decreaseAmount(lp)); // 수량 감소용 액션
    dispatch(calculateTotal());
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded p-4 mb-4 w-1/2">
      <img
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
        className="w-20 h-20 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="bg-gray-300 px-3 py-1 rounded-l hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncrease}
          className="bg-gray-300 px-3 py-1 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
