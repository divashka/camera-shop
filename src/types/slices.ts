import { Product, Review, ProductBasket, Promocode, Promo } from '.';
import { SortNames, DirectionFlowCatalog } from '../const/const';

export type CameraSlice = {
  products: Product[];
  isLoadingProducts: boolean;
  isLoadingOneProduct: boolean;
  oneProduct: Product | null;
  similarProducts: Product[];
  activeSortItem: SortNames | '';
  activeFlowDirection: DirectionFlowCatalog | '';
  successOrder: boolean | null;
}

export type PromoSlice = {
  promo: Promo[];
  promocode: Promocode;
  validCoupon: boolean | null;
}

export type ReviewSlice = {
  reviews: Review[];
  isLoadingReview: boolean;
}

export type AppSlice = {
  cart: ProductBasket[];
  modalProductFromCart: Product | null;
  modalDeleteProductFromCart: Product | null;
}

export type ModalSlice = {
  isWrapperModalOpen: boolean;
  isReviewModalOpen: boolean;
  isSuccessReviewModalOpen: boolean;
  isProductModalOpen: boolean;
  isSuccessProductModalOpen: boolean;
  isRemoveModalOpen: boolean;
  isSuccessOrderOpen: boolean;
  isErrorOrderOpen: boolean;
}
