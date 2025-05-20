import { useCartStore } from "../hooks/useCartStore";

export const PriceBox = () => {
  const total = useCartStore((state) => state.total);

  return (
    <div className="p-12 flex justify-between">
      <div></div>
      <div>총 가격: {total}원</div>
    </div>
  );
};
