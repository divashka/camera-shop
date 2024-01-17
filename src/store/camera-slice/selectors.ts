import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getProducts = (state: State) => state[SliceNameSpace.Camera].products;
