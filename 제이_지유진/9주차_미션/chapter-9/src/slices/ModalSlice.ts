import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: "confirmDelete" | null;
  modalProps?: { id: number } | null; // 삭제할 아이템 id 전달
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openConfirmDelete: (state, action: PayloadAction<{ id: number }>) => {
      state.isOpen = true;
      state.modalType = "confirmDelete";
      state.modalProps = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = null;
    },
  },
});

export const { openConfirmDelete, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
