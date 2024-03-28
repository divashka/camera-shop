import { createSlice } from '@reduxjs/toolkit';
import { CameraSlice } from '../../types/slices';
import { SliceNameSpace, SortNames, DirectionFlowCatalog } from '../../const/const';
import { fetchProductsAction, fetchOneProductAction, fetchRelatedProductsAction, fetchProductsByPriceRange, fetchSendOrder } from '../api-actions';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: CameraSlice = {
  products: [],
  isLoadingProducts: false,
  isLoadingOneProduct: false,
  oneProduct: null,
  similarProducts: [],
  activeSortItem: '',
  activeFlowDirection: '',
  successOrder: null
};

export const cameraReducer = createSlice({
  name: SliceNameSpace.Camera,
  initialState,
  reducers: {
    dropProduct: (state) => {
      state.oneProduct = null;
    },
    setActiveSortItem: (state, action: PayloadAction<SortNames | ''>) => {
      state.activeSortItem = action.payload;
    },
    setActiveFlowDirection: (state, action: PayloadAction<DirectionFlowCatalog | ''>) => {
      state.activeFlowDirection = action.payload;
    },
    setSuccessOrderReset: (state) => {
      state.successOrder = null;
    }
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
      })
      .addCase(fetchRelatedProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(fetchProductsByPriceRange.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchSendOrder.fulfilled, (state) => {
        state.successOrder = true;
      })
      .addCase(fetchSendOrder.rejected, (state) => {
        state.successOrder = false;
      });
  }
});

export const { dropProduct, setActiveSortItem, setActiveFlowDirection, setSuccessOrderReset } = cameraReducer.actions;
