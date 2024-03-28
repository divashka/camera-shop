import { SliceNameSpace } from '../../const/const';
import { State } from '../../types';

export const getPromoCode = (state: State) => state[SliceNameSpace.Promo].promocode;

export const getPromoSlides = (state: State) => state[SliceNameSpace.Promo].promo;

export const getValidCouponStatus = (state: State) => state[SliceNameSpace.Promo].invalidCoupon;


