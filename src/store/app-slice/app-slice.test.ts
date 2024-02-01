import { appReducer, setModalActive } from './app-slice';

describe('AppSlice', () => {

  describe('checkSliceDefault', () => {

    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        modalIsActive: false
      };

      const result = appReducer.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        modalIsActive: false
      };

      const result = appReducer.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

  });

  describe('setModalActive', () => {

    it('should set modal active with setModalActive action', () => {
      const initialState = {
        modalIsActive: false
      };
      const expectedState = {
        modalIsActive: true
      };

      const result = appReducer.reducer(initialState, setModalActive());

      expect(result).toEqual(expectedState);
    });

  });

});
