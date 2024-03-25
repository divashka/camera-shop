import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getIsActiveModalStatus = (state: State) => state[SliceNameSpace.Modal].isWrapperModalOpen;

export const getIsReviewModalStatus = (state: State) => state[SliceNameSpace.Modal].isReviewModalOpen;

export const getIsSuccessReviewStatus = (state: State) => state[SliceNameSpace.Modal].isSuccessReviewModalOpen;

export const getIsProductAddModalStatus = (state: State) => state[SliceNameSpace.Modal].isProductModalOpen;

export const getIsSuccessAddModalStatus = (state: State) => state[SliceNameSpace.Modal].isSuccessProductModalOpen;

export const getIsRemoveModalStatus = (state: State) => state[SliceNameSpace.Modal].isRemoveModalOpen;

export const getIsSuccessRemoveModalStatus = (state: State) => state[SliceNameSpace.Modal].isSuccesRemoveOpen;
