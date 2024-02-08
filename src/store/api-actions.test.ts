import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { fetchProductsAction, fetchOneProductAction, fetchRelatedProductsAction, fetchReviewsAction, fetchAddReviewAction } from './api-actions';
import { State, ReviewData } from '../types';
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

});
