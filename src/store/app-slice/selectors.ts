import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getIsActiveModalStatus = (state: State) => state[SliceNameSpace.App].modalIsActive;
