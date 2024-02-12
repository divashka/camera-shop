import { createSlice } from '@reduxjs/toolkit';
import { ReviewSlice } from '../../types/slices';
import { SliceNameSpace } from '../../const/const';
import { fetchAddReviewAction, fetchReviewsAction } from '../api-actions';

const initialState: ReviewSlice = {
  reviews: [],
  isLoadingReview: false,
  isSuccesAddReview: false
};

export const reviewReducer = createSlice({
  name: SliceNameSpace.Review,
  initialState,
  reducers: {
    changeIsSuccesAddReview: (state) => {
      state.isSuccesAddReview = !state.isSuccesAddReview;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchAddReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isLoadingReview = false;
        state.isSuccesAddReview = true;
      })
      .addCase(fetchAddReviewAction.pending, (state) => {
        state.isLoadingReview = true;
      })
      .addCase(fetchAddReviewAction.rejected, (state) => {
        state.isLoadingReview = false;
        state.isSuccesAddReview = false;
      });

  }
});

export const { changeIsSuccesAddReview } = reviewReducer.actions;
