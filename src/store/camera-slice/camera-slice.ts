import { createSlice } from '@reduxjs/toolkit';
import { CameraSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchProductsAction } from '../api-actions';

const initialState: CameraSlice = {
  products: [],
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
      });
  }
});