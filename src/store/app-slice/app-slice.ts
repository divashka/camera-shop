import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace } from '../../const/const';
import { Product } from '../../types';

const initialState: AppSlice = {
  cart: [],
  modalProductFromCart: null,
  isWrapperModalOpen: false,
  isReviewModalOpen: false,
  isSuccessReviewModalOpen: false,
  isProductModalOpen: false,
  isSuccessProductModalOpen: false,
};

export const appReducer = createSlice({
  name: SliceNameSpace.Review,
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
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    deleteFromCart: (state, action: PayloadAction<Product['id']>) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload);
    },
    setModalProductFromCart: (state, action: PayloadAction<Product>) => {
      state.modalProductFromCart = action.payload;
    },
  },
});

export const { setModalActive, setReviewModalActive, setSuccessReviewModalActive, setProductAddModalActive, setSuccessAddModalActive, addToCart, deleteFromCart, setModalProductFromCart } = appReducer.actions;
