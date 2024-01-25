import { Product, Review } from '.';

export type CameraSlice = {
  products: Product[];
  isLoadingProducts: boolean;
  isLoadingOneProduct: boolean;
  oneProduct: Product | null;
  error: boolean;
  similarProducts: Product[];
}

export type ReviewSlice = {
  reviews: Review[];
}

export type AppSlice = {
  modalIsActive: boolean;
}
