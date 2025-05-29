import { createSlice } from "@reduxjs/toolkit";
import { ModalState } from "../types/cart";

const initialState: ModalState = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
