import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import { PriceBox } from "./components/PriceBox";
import { useEffect } from "react";
import { useCartActions } from "./hooks/useCartStore";

function App() {
  const { calculateTotals } = useCartActions();
  useEffect(() => {
    // 초기화 작업

    calculateTotals();
  }, [calculateTotals]);
  return (
    <div>
      <Navbar />
      <CartList />
      <PriceBox />
    </div>
  );
}

export default App;
