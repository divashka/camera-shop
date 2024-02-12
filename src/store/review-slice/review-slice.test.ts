import { reviewReducer } from './review-slice';
import { review, mockProduct } from '../../utils/mocks';
import { fetchReviewsAction, fetchAddReviewAction } from '../api-actions';

describe('ReviewSlice', () => {

  describe('checkSliceDefault', () => {

    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [review, review, review],
        isLoadingReview: false,
        isSuccesAddReview: false
      };

      const result = reviewReducer.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [],
        isLoadingReview: false,
        isSuccesAddReview: false
      };

      const result = reviewReducer.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

  });

  describe('fetchReviewsAction', () => {

    it('should return reviews array with fetchReviewsAction action', () => {
      const id = mockProduct.id;

      const expectedState = {
        reviews: [review],
        isLoadingReview: false,
        isSuccesAddReview: false
      };

      const result = reviewReducer.reducer(
        undefined,
        fetchReviewsAction.fulfilled(
          [review], '', id)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchAddReviewAction', () => {

    const reviewData = {
      cameraId: 1,
      userName: 'Иван',
      advantage: 'цена',
      disadvantage: 'качество',
      review: 'В целом нормально',
      rating: 3
    };

    it('should push review in reviews array with fetchAddReviewAction action.fulfilled', () => {
      const expectedState = {
        reviews: [review],
        isLoadingReview: false,
        isSuccesAddReview: true
      };

      const result = reviewReducer.reducer(
        undefined,
        fetchAddReviewAction.fulfilled(
          review, '', reviewData)
      );

      expect(result).toEqual(expectedState);
    });

    it('should isLoadingReview=true with fetchAddReviewAction action.pending', () => {
      const expectedState = {
        reviews: [],
        isLoadingReview: true,
        isSuccesAddReview: false
      };

      const result = reviewReducer.reducer(
        undefined,
        fetchAddReviewAction.pending(
          '', reviewData, undefined)
      );

      expect(result).toEqual(expectedState);
    });

  });

});
