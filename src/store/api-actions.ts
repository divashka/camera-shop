import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const/const';
import { Product, AppDispatch, State } from '../types/types';

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

export const fetchOneProductAction = createAsyncThunk<Product, string, {
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

export const fetchRelatedProductsAction = createAsyncThunk<Product[], string, {
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

