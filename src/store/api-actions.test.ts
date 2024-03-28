import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { fetchProductsAction, fetchOneProductAction, fetchRelatedProductsAction, fetchReviewsAction, fetchAddReviewAction, fetchProductsByPriceRange, fetchPromoAction, fetchDiscontByCoupon, fetchSendOrder } from './api-actions';
import { State, ReviewData, PromocodeData } from '../types';
import { APIRoute } from '../const/const';
import { extractActionsTypes, AppThunkDispatch } from '../utils/mocks';

describe('API ACTIONS', () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ APP: {}, CAMERA: { products: [] }, REVIEW: {} });
  });

  describe('fetchProductsAction', () => {

    it('should dispatch fetchProductsAction.pending and fetchProductsAction.fulfilled with thunk fetchProductsAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Camera).reply(200);

      await store.dispatch((fetchProductsAction()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type
      ]);
    });

  });

  describe('fetchOneProductAction', () => {

    it('should dispatch fetchOneProductAction.pending and fetchOneProductAction.fulfilled with thunk fetchOneProductAction',
      async () => {

        const id = 1;
        mockAxiosAdapter.onGet(`${APIRoute.Camera}/${id}`).reply(200);

        await store.dispatch((fetchOneProductAction(id)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOneProductAction.pending.type,
          fetchOneProductAction.fulfilled.type
        ]);
      });

  });

  describe('fetchRelatedProductsAction', () => {

    it('should dispatch fetchRelatedProductsAction.pending and fetchRelatedProductsAction.fulfilled with thunk fetchRelatedProductsAction',
      async () => {

        const id = 1;
        mockAxiosAdapter.onGet(`${APIRoute.Camera}/${id}/similar`).reply(200);

        await store.dispatch((fetchRelatedProductsAction(id)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchRelatedProductsAction.pending.type,
          fetchRelatedProductsAction.fulfilled.type
        ]);
      });

  });

  describe('fetchReviewsAction', () => {

    it('should dispatch fetchReviewsAction.pending and fetchReviewsAction.fulfilled with thunk fetchReviewsAction',
      async () => {

        const id = 1;
        mockAxiosAdapter.onGet(`${APIRoute.Camera}/${id}/reviews`).reply(200);

        await store.dispatch((fetchReviewsAction(id)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchReviewsAction.pending.type,
          fetchReviewsAction.fulfilled.type
        ]);
      });

  });

  describe('fetchAddReviewAction', () => {

    it('should dispatch fetchAddReviewAction.pending and fetchAddReviewAction.fulfilled with thunk fetchAddReviewAction',
      async () => {

        const data: ReviewData = {
          cameraId: 1,
          userName: 'John',
          advantage: 'size',
          disadvantage: 'price',
          review: 'Good',
          rating: 3
        };

        mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200);

        await store.dispatch((fetchAddReviewAction(data)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchAddReviewAction.pending.type,
          fetchAddReviewAction.fulfilled.type
        ]);
      });

  });

  describe('fetchProductsByPriceRange', () => {

    it('should dispatch fetchProductsByPriceRange.pending and fetchProductsByPriceRange.fulfilled with thunk fetchProductsByPriceRange',
      async () => {

        const filterPrice = {
          from: '1000',
          to: '20000'
        };

        const queryGte = `price_gte=${filterPrice.from}`;
        const queryLte = `&price_lte=${filterPrice.to}`;

        mockAxiosAdapter.onGet(`${APIRoute.Camera}?${queryGte}${queryLte}`).reply(200);

        await store.dispatch((fetchProductsByPriceRange(filterPrice)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchProductsByPriceRange.pending.type,
          fetchProductsByPriceRange.fulfilled.type
        ]);
      });

  });

  describe('fetchPromoAction', () => {

    it('should dispatch fetchPromoAction.pending and fetchPromoAction.fulfilled with thunk fetchPromoAction',
      async () => {
        mockAxiosAdapter.onGet(`${APIRoute.Promo}`).reply(200);

        await store.dispatch((fetchPromoAction()));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchPromoAction.pending.type,
          fetchPromoAction.fulfilled.type
        ]);
      });

  });

  describe('fetchDiscontByCoupon', () => {

    it('should dispatch fetchDiscontByCoupon.pending and fetchDiscontByCoupon.fulfilled with thunk fetchDiscontByCoupon',
      async () => {

        const promocodeData: PromocodeData = {
          coupon: 'camera-333'
        };

        mockAxiosAdapter.onPost(APIRoute.Coupons, promocodeData).reply(200);

        await store.dispatch((fetchDiscontByCoupon(promocodeData)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchDiscontByCoupon.pending.type,
          fetchDiscontByCoupon.fulfilled.type
        ]);
      });

  });

  describe('fetchSendOrder', () => {

    it('should dispatch fetchSendOrder.pending and fetchSendOrder.fulfilled with thunk fetchSendOrder',
      async () => {
        const orderData = {
          camerasIds: [1,2,3],
          coupon: null
        };

        mockAxiosAdapter.onPost(APIRoute.Orders, orderData).reply(200);

        await store.dispatch((fetchSendOrder(orderData)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchSendOrder.pending.type,
          fetchSendOrder.fulfilled.type
        ]);
      });

  });

});
