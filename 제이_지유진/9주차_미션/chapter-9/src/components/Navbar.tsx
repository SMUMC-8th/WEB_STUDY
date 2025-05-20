import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import type { RootState } from "../store/store";

function Navbar() {
  const amount = useSelector((state: RootState) => state.cart.amount);

  return (
    <div className="flex fixed w-full justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">LP 그만 사세요</h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl">{amount}</span>
      </div>
    </div>
  );
}

export default Navbar;
