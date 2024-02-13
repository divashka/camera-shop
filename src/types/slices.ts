import { Product, Review } from '.';

export type CameraSlice = {
  products: Product[];
  isLoadingProducts: boolean;
  isLoadingOneProduct: boolean;
  oneProduct: Product | null;
  similarProducts: Product[];
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
