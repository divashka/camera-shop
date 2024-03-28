import { promoReducer } from './promo-slice';
import { mockPromoSlides } from '../../utils/mocks';
import { fetchPromoAction, fetchDiscontByCoupon } from '../api-actions';
import { PromocodeData } from '../../types';

describe('PromoSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        promocode: {
          name: null,
          discont: 0,
        },
        promo: [],
        invalidCoupon: false,
      };

      const result = promoReducer.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        promocode: {
          name: null,
          discont: 0,
        },
        promo: [],
        invalidCoupon: false,
      };

      const result = promoReducer.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchPromoAction', () => {

    it('should return promo array with fetchPromoAction.fulfilled action', () => {
      const expectedState = {
        promocode: {
          name: null,
          discont: 0,
        },
        promo: [...mockPromoSlides],
        invalidCoupon: false,
      };

      const result = promoReducer.reducer(
        undefined,
        fetchPromoAction.fulfilled(
          mockPromoSlides, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

  });

  describe('fetchDiscontByCoupon', () => {

    it('should return promo discont with fetchDiscontByCoupon.fulfilled action', () => {
      const coupon: PromocodeData = {
        coupon: 'camera-333'
      };
      const discont = 15;

      const expectedState = {
        promocode: {
          name: null,
          discont: 15,
        },
        promo: [],
        invalidCoupon: false,
      };

      const result = promoReducer.reducer(
        undefined,
        fetchDiscontByCoupon.fulfilled(
          discont, '', coupon)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return invalidCoupon with fetchDiscontByCoupon.rejected action', () => {
      const coupon: PromocodeData = {
        coupon: 'camera-333'
      };

      const expectedState = {
        promocode: {
          name: null,
          discont: 0,
        },
        promo: [],
        invalidCoupon: true,
      };

      const result = promoReducer.reducer(
        undefined,
        fetchDiscontByCoupon.rejected(
          null, '', coupon)
      );

      expect(result).toEqual(expectedState);
    });

  });
});
