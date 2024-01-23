import { createSlice } from '@reduxjs/toolkit';
import { CameraSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchProductsAction, fetchOneProductAction } from '../api-actions';

const initialState: CameraSlice = {
  products: [],
  isLoadingProducts: false,
  isLoadingOneProduct: false,
  oneProduct: null,
  error: false,
  similarProducts: []
};

export const cameraReducer = createSlice({
  name: SliceNameSpace.Camera,
  initialState,
  reducers: {
    dropProduct: (state) => {
      state.oneProduct = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoadingProducts = false;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isLoadingProducts = true;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isLoadingProducts = false;
      })
      .addCase(fetchOneProductAction.fulfilled, (state, action) => {
        state.oneProduct = action.payload;
      })
      .addCase(fetchOneProductAction.pending, (state) => {
        state.isLoadingOneProduct = true;
      })
      .addCase(fetchOneProductAction.rejected, (state) => {
        state.isLoadingOneProduct = false;
      });
  }
});

export const { dropProduct } = cameraReducer.actions;
