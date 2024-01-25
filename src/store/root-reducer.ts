import { combineReducers } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../const/const';
import { cameraReducer } from './camera-slice/camera-slice';
import { reviewReducer } from './review-slice/review-slice';

export const rootReducer = combineReducers({
  [SliceNameSpace.Camera]: cameraReducer.reducer,
  [SliceNameSpace.Review]: reviewReducer.reducer,
});
