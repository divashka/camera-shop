import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace } from '../../const/const';
import { Product } from '../../types';

const initialState: AppSlice = {
  cart: [],
  modalProductFromCart: null,
  modalDeleteProductFromCart: null,
  isWrapperModalOpen: false,
  isReviewModalOpen: false,
  isSuccessReviewModalOpen: false,
  isProductModalOpen: false,
  isSuccessProductModalOpen: false,
  isRemoveModalOpen: false,
  isSuccesRemoveOpen: false
};

export const appReducer = createSlice({
  name: SliceNameSpace.App,
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
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    deleteFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload.id);
    },
    setModalProductFromCart: (state, action: PayloadAction<Product>) => {
      state.modalProductFromCart = action.payload;
    },
    setModalProductDeleteFromCart: (state, action: PayloadAction<Product>) => {
      state.modalDeleteProductFromCart = action.payload;
    },
  },
});

export const { setModalActive, setReviewModalActive, setSuccessReviewModalActive, setProductAddModalActive, setSuccessAddModalActive, addToCart, deleteFromCart, setModalProductFromCart, setRemoveModalActive, setSuccessRemoveModalActive, setModalProductDeleteFromCart } = appReducer.actions;
