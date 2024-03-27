import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace, ChangeProductCount } from '../../const/const';
import { Product, ProductBasket, Promocode } from '../../types';
import { MAX_COUNT_PRODUCTS, MIN_COUNT_PRODUCTS } from '../../const/const';
import { getProductsFromLocalStorage } from '../../utils/utils';

type ChangeCount = {
  type?: ChangeProductCount;
  id: ProductBasket['id'];
  count?: number;
}

const initialState: AppSlice = {
  promocode: {
    name: '',
    discont: 0,
  },
  cart: JSON.parse(localStorage.getItem('products') || '[]') as ProductBasket[],
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
      getProductsFromLocalStorage(state.cart);
    },
    deleteFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload.id);
      getProductsFromLocalStorage(state.cart);
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
      getProductsFromLocalStorage(state.cart);
    },
    setPromoCode: (state, action: PayloadAction<Promocode>) => {
      if (!state.promocode.name) {
        state.promocode = action.payload;
      }
    },
  },
});

export const { addToCart, deleteFromCart, setModalProductFromCart, setModalProductDeleteFromCart, changeProductCountInBasket, setPromoCode } = appReducer.actions;
