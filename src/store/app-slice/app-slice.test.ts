import { appReducer } from './app-slice';

describe('AppSlice', () => {

  describe('checkSliceDefault', () => {

    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cart: [],
        modalProductFromCart: null,
        modalDeleteProductFromCart: null,
      };

      const result = appReducer.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cart: [],
        modalProductFromCart: null,
        modalDeleteProductFromCart: null,
      };

      const result = appReducer.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

  });

});
