import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getIsActiveModalStatus = (state: State) => state[SliceNameSpace.App].isWrapperModalOpen;

export const getIsReviewModalStatus = (state: State) => state[SliceNameSpace.App].isReviewModalOpen;

export const getIsSuccessReviewStatus = (state: State) => state[SliceNameSpace.App].isSuccessReviewModalOpen;

export const getIsProductAddModalStatus = (state: State) => state[SliceNameSpace.App].isProductModalOpen;

export const getIsSuccessAddModalStatus = (state: State) => state[SliceNameSpace.App].isSuccessProductModalOpen;

export const getIsRemoveModalStatus = (state: State) => state[SliceNameSpace.App].isRemoveModalOpen;

export const getIsSuccessRemoveModalStatus = (state: State) => state[SliceNameSpace.App].isSuccesRemoveOpen;

export const getProductsFromCart = (state: State) => state[SliceNameSpace.App].cart;

export const getModalProductFromCart = (state: State) => state[SliceNameSpace.App].modalProductFromCart;
