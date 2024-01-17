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
