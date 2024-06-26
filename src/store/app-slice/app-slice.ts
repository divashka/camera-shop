import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace, ChangeProductCount } from '../../const/const';
import { Product, ProductBasket } from '../../types';
import { MAX_COUNT_PRODUCTS, MIN_COUNT_PRODUCTS } from '../../const/const';
import { getProductsFromLocalStorage } from '../../utils/utils';

type ChangeCount = {
  type?: ChangeProductCount;
  id: ProductBasket['id'];
  count?: number;
}

const initialState: AppSlice = {
  cart: JSON.parse(localStorage.getItem('products') || '[]') as ProductBasket[],
  modalProductFromCart: null,
  modalDeleteProductFromCart: null,
};

export const appReducer = createSlice({
  name: SliceNameSpace.App,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      let product: ProductBasket;

      const cartCount = state.cart.reduce((count, product) => count + Number(product.count), 0)

      if (cartCount === MAX_COUNT_PRODUCTS) {
        product = { ...action.payload, count: '0' };
      } else {
        product = { ...action.payload, count: '1' };
      }
      
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
    resetProductFromCart: (state) => {
      state.cart = [];
    },
    setModalProductDeleteFromCart: (state, action: PayloadAction<Product>) => {
      state.modalDeleteProductFromCart = action.payload;
    },
    changeProductCountInBasket: (state, action: PayloadAction<ChangeCount>) => {
      const payload = action.payload;
      const count = payload.count;

      if (count !== undefined) {
        state.cart = state.cart.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              count: count === 0 ? '' : String(count)
            };
          }
          return product;
        });
      } else {
        state.cart = state.cart.map((product) => {
          if (product.id === payload.id && payload.type === ChangeProductCount.Increase) {
            const newCount = Math.min(Number(product.count) + 1, MAX_COUNT_PRODUCTS);
            return {
              ...product,
              count: String(newCount)
            };
          } else if (product.id === payload.id && payload.type === ChangeProductCount.Decrease) {
            const newCount = Math.max(Number(product.count) - 1, MIN_COUNT_PRODUCTS);
            return {
              ...product,
              count: String(newCount)
            };
          }
          return product;
        });
      }
      getProductsFromLocalStorage(state.cart);
    }
  },
});

export const { addToCart, deleteFromCart, setModalProductFromCart, setModalProductDeleteFromCart, changeProductCountInBasket, resetProductFromCart } = appReducer.actions;
