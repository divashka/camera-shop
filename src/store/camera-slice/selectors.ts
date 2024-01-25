import { State } from '../../types';
import { SliceNameSpace } from '../../const/const';

export const getProducts = (state: State) => state[SliceNameSpace.Camera].products;

export const getOneProduct = (state: State) => state[SliceNameSpace.Camera].oneProduct;

export const getErrorStatus = (state: State) => state[SliceNameSpace.Camera].error;

export const getLoadingProductsStatus = (state: State) => state[SliceNameSpace.Camera].isLoadingProducts;

export const getLoadingOneProductStatus = (state: State) => state[SliceNameSpace.Camera].isLoadingOneProduct;

export const getRelatedProducts = (state: State) => state[SliceNameSpace.Camera].similarProducts;
