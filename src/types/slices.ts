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
  isSuccesAddReview: boolean;
}

export type AppSlice = {
  modalIsActive: boolean;
}
