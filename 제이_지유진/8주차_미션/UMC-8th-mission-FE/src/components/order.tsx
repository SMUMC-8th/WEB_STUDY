import { TOrder } from "../constants/enum";

type TOrderProps = {
  order: TOrder;
  setOrder: (order: TOrder) => void;
};

function Order({ order, setOrder }: TOrderProps) {
  return (
    <div className="flex w-[200px] border border-gray-300 rounded-md overflow-hidden">
      <button
        className={`flex-1 py-2 text-center ${
          order === TOrder.OLDEST_FIRST
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => setOrder(TOrder.OLDEST_FIRST)}
      >
        오래된 순
      </button>
      <button
        className={`flex-1 py-2 text-center ${
          order === TOrder.NEWEST_FIRST
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => setOrder(TOrder.NEWEST_FIRST)}
      >
        최신 순
      </button>
    </div>
  );
}

export default Order;
