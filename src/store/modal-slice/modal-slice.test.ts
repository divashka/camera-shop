import { modalReducer, setModalActive } from './modal-slice';

describe('ModalSlice', () => {
  describe('setModalActive', () => {
    it('should set modal wrapper active with setModalActive action', () => {
      const initialState = {
        isWrapperModalOpen: false,
        isReviewModalOpen: false,
        isSuccessReviewModalOpen: false,
        isProductModalOpen: false,
        isSuccessProductModalOpen: false,
        isRemoveModalOpen: false,
        isSuccesRemoveOpen: false,
      };
      const expectedState = {
        isWrapperModalOpen: true,
        isReviewModalOpen: false,
        isSuccessReviewModalOpen: false,
        isProductModalOpen: false,
        isSuccessProductModalOpen: false,
        isRemoveModalOpen: false,
        isSuccesRemoveOpen: false,
      };

      const result = modalReducer.reducer(initialState, setModalActive(true));

      expect(result).toEqual(expectedState);
    });

  });
});

