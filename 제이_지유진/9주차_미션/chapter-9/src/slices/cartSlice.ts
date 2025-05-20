import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cardItems";
export interface CartState {
  cartItems: typeof cartItems;
  amount: number;
  total: number;
}

const calculateInitialTotals = (items: typeof cartItems) => {
  let total = 0;
  let amount = 0;

  items.forEach((item) => {
    total += item.price * item.amount;
    amount += item.amount;
  });

  return { total, amount };
};

const { total, amount } = calculateInitialTotals(cartItems);

const initialState: CartState = {
  cartItems: cartItems,
  amount: amount,
  total: total,
};

//carslice 생성
// createSlice -> reduxToolkit에서 제공
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 장바구니에 추가
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.amount += 1;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
    },
    decreaseAmount: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
        }
      }
    },
    // 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },
    // 총액 계산
    calculateTotal: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        total += item.price * item.amount;
        amount += item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
});

export const { addToCart, decreaseAmount, clearCart, calculateTotal } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
