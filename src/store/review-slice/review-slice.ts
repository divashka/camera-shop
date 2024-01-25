import { createSlice } from '@reduxjs/toolkit';
import { ReviewSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchReviewsAction } from '../api-actions';

const initialState: ReviewSlice = {
  reviews: []
};

export const reviewReducer = createSlice({
  name: SliceNameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
