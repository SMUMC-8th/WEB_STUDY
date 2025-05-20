import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { CartState } from "../slices/cartSlice";
import { clearCart } from "../slices/cartSlice";

export const PriceBox = () => {
  const { total } = useSelector((state): CartState => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="p-12 flex justify-between">
      <div>
        <button
          onClick={handleInitializeCart}
          className="border p-4 rounded-md cursor pointer"
        >
          장바구니 초기화
        </button>
      </div>
      <div>총 가격: {total}원</div>
    </div>
  );
};
