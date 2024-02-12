import { cameraReducer, dropProduct } from './camera-slice';
import { mockProduct, mockProducts } from '../../utils/mocks';
import { fetchProductsAction, fetchOneProductAction, fetchRelatedProductsAction } from '../api-actions';

describe('CameraSlice', () => {

  describe('checkSliceDefault', () => {

    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: null,
        similarProducts: []
      };

      const result = cameraReducer.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: null,
        similarProducts: []
      };

      const result = cameraReducer.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

  });

  describe('dropProduct', () => {

    it('should dropProduct with dropProduct action', () => {
      const initialState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: mockProduct,
        similarProducts: []
      };

      const expectedState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: null,
        similarProducts: []
      };

      const result = cameraReducer.reducer(initialState, dropProduct());

      expect(result).toEqual(expectedState);
    });


  });

  describe('fetchProductsAction', () => {

    it('should return products array with fetchProductsAction action', () => {
      const expectedState = {
        products: [...mockProducts],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: null,
        similarProducts: []
      };

      const result = cameraReducer.reducer(
        undefined,
        fetchProductsAction.fulfilled(
          mockProducts, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return isLoadingProducts = true with fetchProductsAction.pending action', () => {
      const expectedState = {
        products: [],
        isLoadingProducts: true,
        isLoadingOneProduct: false,
        oneProduct: null,
        similarProducts: []
      };

      const result = cameraReducer.reducer(
        undefined,
        fetchProductsAction.pending);

      expect(result).toEqual(expectedState);
    });

  });

  describe('fetchOneProductAction', () => {

    it('should return product object with fetchOneProductAction action', () => {
      const id = mockProduct.id;

      const expectedState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: mockProduct,
        similarProducts: []
      };

      const result = cameraReducer.reducer(
        undefined,
        fetchOneProductAction.fulfilled(
          mockProduct, '', id)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return isLoadingOneProduct=true with fetchOneProductAction.pending action', () => {
      const id = mockProduct.id;

      const expectedState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: true,
        oneProduct: null,
        similarProducts: []
      };

      const result = cameraReducer.reducer(
        undefined,
        fetchOneProductAction.pending(
          '', id, undefined)
      );

      expect(result).toEqual(expectedState);
    });

  });

  describe('fetchRelatedProductsAction', () => {

    it('should return related products array with fetchRelatedProductsAction action', () => {
      const id = mockProduct.id;

      const expectedState = {
        products: [],
        isLoadingProducts: false,
        isLoadingOneProduct: false,
        oneProduct: null,
        similarProducts: [...mockProducts]
      };

      const result = cameraReducer.reducer(
        undefined,
        fetchRelatedProductsAction.fulfilled(
          mockProducts, '', id)
      );

      expect(result).toEqual(expectedState);
    });

  });

});
