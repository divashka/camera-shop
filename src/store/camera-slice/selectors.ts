import { State, Product } from '../../types';
import { DirectionFlowCatalog, SliceNameSpace, SortNames } from '../../const/const';
import { createSelector } from '@reduxjs/toolkit';
import { capitalizeFirstLetter } from '../../utils/utils';

export const getProducts = (state: State) => state[SliceNameSpace.Camera].products;

export const getOneProduct = (state: State) => state[SliceNameSpace.Camera].oneProduct;

export const getLoadingProductsStatus = (state: State) => state[SliceNameSpace.Camera].isLoadingProducts;

export const getLoadingOneProductStatus = (state: State) => state[SliceNameSpace.Camera].isLoadingOneProduct;

export const getRelatedProducts = (state: State) => state[SliceNameSpace.Camera].similarProducts;

export const getActiveSortItem = (state: State) => state[SliceNameSpace.Camera].activeSortItem;

export const getActivFlowDirection = (state: State) => state[SliceNameSpace.Camera].activeFlowDirection;

export const getSortedProducts = (products: Product[]) => createSelector(
  [
    getActiveSortItem,
    getActivFlowDirection
  ],
  (item, flow) => {
    switch (item) {
      case capitalizeFirstLetter(SortNames.Popular):
        if (flow === capitalizeFirstLetter(DirectionFlowCatalog.Up)) {
          return products.slice().sort((ProductA: Product, ProductB: Product) => ProductA.rating - ProductB.rating);
        }
        return products.slice().sort((ProductA: Product, ProductB: Product) => ProductB.rating - ProductA.rating);
      case capitalizeFirstLetter(SortNames.Price):
        if (flow === capitalizeFirstLetter(DirectionFlowCatalog.Up)) {
          return products.slice().sort((ProductA: Product, ProductB: Product) => ProductA.price - ProductB.price);
        }
        return products.slice().sort((ProductA: Product, ProductB: Product) => ProductB.price - ProductA.price);
      default:
        return products;
    }
  }
);

