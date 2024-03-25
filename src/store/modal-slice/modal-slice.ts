import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalSlice } from '../../types/slices';
import { SliceNameSpace } from '../../const/const';

const initialState: ModalSlice = {
  isWrapperModalOpen: false,
  isReviewModalOpen: false,
  isSuccessReviewModalOpen: false,
  isProductModalOpen: false,
  isSuccessProductModalOpen: false,
  isRemoveModalOpen: false,
  isSuccesRemoveOpen: false
};

export const modalReducer = createSlice({
  name: SliceNameSpace.Modal,
  initialState,
  reducers: {
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.isWrapperModalOpen = action.payload;
      document.body.classList.toggle('scroll-lock');
    },
    setReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalOpen = action.payload;
    },
    setSuccessReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.isSuccessReviewModalOpen = action.payload;
    },
    setProductAddModalActive: (state, action: PayloadAction<boolean>) => {
      state.isProductModalOpen = action.payload;
    },
    setSuccessAddModalActive: (state, action: PayloadAction<boolean>) => {
      state.isSuccessProductModalOpen = action.payload;
    },
    setRemoveModalActive: (state, action: PayloadAction<boolean>) => {
      state.isRemoveModalOpen = action.payload;
    },
    setSuccessRemoveModalActive: (state, action: PayloadAction<boolean>) => {
      state.isSuccesRemoveOpen = action.payload;
    }
  },
});

export const { setModalActive, setReviewModalActive, setSuccessReviewModalActive, setProductAddModalActive, setSuccessAddModalActive, setRemoveModalActive, setSuccessRemoveModalActive } = modalReducer.actions;
