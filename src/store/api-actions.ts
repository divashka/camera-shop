import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const/const';
import { Product, AppDispatch, State, Review, ReviewData, FilterPrice } from '../types';

export const fetchProductsAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'camera/fetchProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Product[]>(APIRoute.Camera);
    return data;
  },
);

export const fetchOneProductAction = createAsyncThunk<Product, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'camera/fetchOneProduct',
  async (id, { extra: api }) => {
    const { data } = await api.get<Product>(`${APIRoute.Camera}/${id}`);
    return data;
  },
);

export const fetchRelatedProductsAction = createAsyncThunk<Product[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'camera/fetchRelatedProducts',
  async (id, { extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Camera}/${id}/similar`);
    return data;
  },
);

export const fetchProductsByPriceRange = createAsyncThunk<Product[], FilterPrice, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'camera/fetchProductsByPriceRange',
  async (filterPrice, { extra: api }) => {
    let queryGte = '';
    let queryLte = '';

    if (filterPrice.from) {
      queryGte = `price_gte=${filterPrice.from}`;
    }

    if (filterPrice.to) {
      queryLte = `&price_lte=${filterPrice.to}`;
    }
    const { data } = await api.get<Product[]>(`${APIRoute.Camera}?${queryGte}${queryLte}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/fetchReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Camera}/${id}/reviews`);
    return data;
  },
);

export const fetchAddReviewAction = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/fetchAddReview',
  async (arg, { extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.Reviews, arg);
    return data;
  },
);
