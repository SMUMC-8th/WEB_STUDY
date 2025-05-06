import { useEffect } from "react";
import { TOrder } from "../constants/enum";

type TOrderProps = {
  order: TOrder;
  setOrder: (order: TOrder) => void;
};

const Order = ({ order, setOrder }: TOrderProps) => {
  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="flex justify-end w-full mb-4">
      <div className="flex border border-white rounded-md overflow-hidden">
        <button
          className={`w-[100px] py-2 text-sm font-semibold transition-colors duration-200
            ${
              order === TOrder.OLDEST
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          onClick={() => setOrder(TOrder.OLDEST)}
        >
          오래된 순
        </button>
        <button
          className={`w-[100px] py-2 text-sm font-semibold transition-colors duration-200
            ${
              order === TOrder.NEWEST
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          onClick={() => setOrder(TOrder.NEWEST)}
        >
          최신순
        </button>
      </div>
    </div>
  );
};

export default Order;
