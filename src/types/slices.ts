import { Product, Review } from '.';
import { SortNames, DirectionFlowCatalog } from '../const/const';

export type CameraSlice = {
  products: Product[];
  isLoadingProducts: boolean;
  isLoadingOneProduct: boolean;
  oneProduct: Product | null;
  similarProducts: Product[];
  activeSortItem: SortNames | string;
  activeFlowDirection: DirectionFlowCatalog | string;
}

export type ReviewSlice = {
  reviews: Review[];
  isLoadingReview: boolean;
}

export type AppSlice = {
  isWrapperModalOpen: boolean;
  isReviewModalOpen: boolean;
  isSuccessReviewModalOpen: boolean;
  isProductModalOpen: boolean;
  isSuccessProductModalOpen: boolean;
}
