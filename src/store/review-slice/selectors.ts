import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getReviews = (state: State) => state[SliceNameSpace.Review].reviews;

export const getStatusLoadingReview = (state: State) => state[SliceNameSpace.Review].isLoadingReview;
