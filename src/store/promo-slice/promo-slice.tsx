import { createSlice } from '@reduxjs/toolkit';
import { PromoSlice } from '../../types/slices';
import { SliceNameSpace } from '../../const/const';
import { fetchPromoAction, fetchDiscontByCoupon } from '../api-actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { PromocodeNames } from '../../types';

const initialState: PromoSlice = {
  promocode: {
    name: null,
    discont: 0,
  },
  promo: [],
  invalidCoupon: false,
};

export const promoReducer = createSlice({
  name: SliceNameSpace.Promo,
  initialState,
  reducers: {
    setPromoCodeName: (state, action: PayloadAction<PromocodeNames>) => {
      state.promocode.name = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchDiscontByCoupon.fulfilled, (state, action) => {
        state.promocode.discont = action.payload;
        state.invalidCoupon = false;
      })
      .addCase(fetchDiscontByCoupon.rejected, (state) => {
        state.invalidCoupon = true;
      });
  }
});

export const { setPromoCodeName } = promoReducer.actions;
