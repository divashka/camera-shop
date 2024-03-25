import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace, ChangeProductCount } from '../../const/const';
import { Product, ProductBasket } from '../../types';
import { MAX_COUNT_PRODUCTS, MIN_COUNT_PRODUCTS } from '../../const/const';

type ChangeCount = {
  type?: ChangeProductCount;
  id: ProductBasket['id'];
  count?: number;
}

const initialState: AppSlice = {
  cart: [],
  modalProductFromCart: null,
  modalDeleteProductFromCart: null,
};

export const appReducer = createSlice({
  name: SliceNameSpace.App,
  initialState,
  reducers: {
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
            const newCount = Math.min(product.count + 1, MAX_COUNT_PRODUCTS);
            return {
              ...product,
              count: newCount
            };
          } else if (product.id === payload.id && payload.type === ChangeProductCount.Decrease) {
            const newCount = Math.max(product.count - 1, MIN_COUNT_PRODUCTS);
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

export const { addToCart, deleteFromCart, setModalProductFromCart, setModalProductDeleteFromCart, changeProductCountInBasket } = appReducer.actions;
