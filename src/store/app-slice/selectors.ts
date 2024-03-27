import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getProductsFromCart = (state: State) => state[SliceNameSpace.App].cart;

export const getModalProductFromCart = (state: State) => state[SliceNameSpace.App].modalProductFromCart;

export const getDeleteProductFromCart = (state: State) => state[SliceNameSpace.App].modalDeleteProductFromCart;

export const getPromoCode = (state: State) => state[SliceNameSpace.App].promocode;
