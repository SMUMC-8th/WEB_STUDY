import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { clearCart } from "../slices/cartSlice";

function PriceBox() {
  const dispatch = useDispatch();
  const total = useSelector((state: RootState) => state.cart.total);

  return (
    <div className="p-12 flex justify-between items-center text-xl font-semibold">
      <div>총 가격: {total.toLocaleString()}원</div>
      <button
        onClick={() => dispatch(clearCart())}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        장바구니 비우기
      </button>
    </div>
  );
}

export default PriceBox;
