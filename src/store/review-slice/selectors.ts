import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getReviews = (state: State) => state[SliceNameSpace.Review].reviews;
