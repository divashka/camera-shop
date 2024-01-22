import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getProducts = (state: State) => state[SliceNameSpace.Camera].products;

export const getLoadingStatus = (state: State) => state[SliceNameSpace.Camera].loading;
