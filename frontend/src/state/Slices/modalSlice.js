import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModalId: null, // No modal is open initially
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.openModalId = action.payload; // Set the modal ID to open
    },
    closeModal: (state) => {
      state.openModalId = null; // Close the modal
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

// Selector to get the open modal ID
export const selectOpenModalId = (state) => state.modal.openModalId;

export default modalSlice.reducer;
