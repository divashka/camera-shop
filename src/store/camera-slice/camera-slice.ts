import { createSlice } from '@reduxjs/toolkit';
import { CameraSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchProductsAction } from '../api-actions';

const initialState: CameraSlice = {
  products: [],
  loading: false,
  oneProduct: null,
  similarProducts: []
};

export const cameraReducer = createSlice({
  name: SliceNameSpace.Camera,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.loading = true;
      });
  }
});
