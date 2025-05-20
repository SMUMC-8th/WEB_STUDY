import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

//1. 저장소를 생성한다. -> 공식 문서를 볼 것
function createStore() {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });
  return store;
}

// stor를 활용할 수 있도록 내보내야 한다.
// 여기서 실행해서 스토어를 빼준다.
// singleton 패턴으로 만들기 위해서
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
