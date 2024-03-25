import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace, ChangeProductCount } from '../../const/const';
import { Product, ProductBasket } from '../../types';

type ChangeCount = {
  type?: ChangeProductCount;
  id: ProductBasket['id'];
  count?: number;
}

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
      const product = { ...action.payload, count: 1 };
      state.cart.push(product);
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
    changeProductCountInBasket: (state, action: PayloadAction<ChangeCount>) => {
      const payload = action.payload;
      const count = payload.count;
      if (count) {
        state.cart = state.cart.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              count: count
            };
          }
          return product;
        });
      } else {
        state.cart = state.cart.map((product) => {
          if (product.id === payload.id && payload.type === ChangeProductCount.Increase) {
            return {
              ...product,
              count: ++product.count
            };
          } else if (product.id === payload.id && payload.type === ChangeProductCount.Decrease) {
            const newCount = product.count - 1 > 1 ? product.count - 1 : 1;
            return {
              ...product,
              count: newCount
            };
          }
          return product;
        });
      }
    },
  },
});

export const { setModalActive, setReviewModalActive, setSuccessReviewModalActive, setProductAddModalActive, setSuccessAddModalActive, addToCart, deleteFromCart, setModalProductFromCart, setRemoveModalActive, setSuccessRemoveModalActive, setModalProductDeleteFromCart, changeProductCountInBasket } = appReducer.actions;
