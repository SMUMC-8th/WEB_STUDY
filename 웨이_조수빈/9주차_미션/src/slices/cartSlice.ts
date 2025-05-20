import cartItems from '../constants/cartItems';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItems } from "../types/cart";

export interface CartState {
    cartItems : CartItems;
    amount : number;
    total : number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

// cartSlice 생성
// createSlice -> reduxToolkit에서 제공하는 함수
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        // cart 증가
        increase : (state, action : PayloadAction<{id : string}>) => {
            const itemId = action.payload.id;
            // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

            if (item) {
                item.amount += 1;
            }
        },
        // cart 감소

        decrease : (state, action : PayloadAction<{id : string}>) => {
            const itemId = action.payload.id;
            // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

            if (item) {
                item.amount -= 1;
            }
        },

        // removeItem 아이템 제거
        removeItem : (state, action : PayloadAction<{id : string}>) => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        },

        // clear cart 장바구니 비우기
        clearCart : (state) => {
            state.cartItems = [];
        },

        // 총액 계산
        calculateTotal : (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        }
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;
// cartSlice.actions는 export default로 내보내기

// duck pattern reducer는 export default로 내보내기
const cartReducer = cartSlice.reducer;
export default cartReducer;