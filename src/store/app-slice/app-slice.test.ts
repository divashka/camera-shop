import { appReducer, setModalActive } from './app-slice';

describe('AppSlice', () => {

  describe('checkSliceDefault', () => {

    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        isWrapperModalOpen: false,
        isReviewModalOpen: false,
        isSuccessReviewModalOpen: false,
        isProductModalOpen: false,
        isSuccessProductModalOpen: false,
      };

      const result = appReducer.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        isWrapperModalOpen: false,
        isReviewModalOpen: false,
        isSuccessReviewModalOpen: false,
        isProductModalOpen: false,
        isSuccessProductModalOpen: false,
      };

      const result = appReducer.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

  });

  describe('setModalActive', () => {

    it('should set modal wrapper active with setModalActive action', () => {
      const initialState = {
        isWrapperModalOpen: false,
        isReviewModalOpen: false,
        isSuccessReviewModalOpen: false,
        isProductModalOpen: false,
        isSuccessProductModalOpen: false,
      };
      const expectedState = {
        isWrapperModalOpen: true,
        isReviewModalOpen: false,
        isSuccessReviewModalOpen: false,
        isProductModalOpen: false,
        isSuccessProductModalOpen: false,
      };

      const result = appReducer.reducer(initialState, setModalActive(true));

      expect(result).toEqual(expectedState);
    });

  });

});
