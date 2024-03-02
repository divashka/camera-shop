export enum AppRoute {
  Root = '/',
  Product = '/product/',
  Basket = '/basket'
}

export enum APIRoute {
  Camera = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders'
}

export enum SliceNameSpace {
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Review = 'REVIEW',
  Order = 'ORDER',
  App = 'APP'
}

export enum TabsName {
  Description = 'description',
  Feature = 'feature'
}

export enum SortNames {
  Price = 'Price',
  Popular = 'Popular'
}

export const SortMap = {
  Price: 'по цене',
  Popular: 'по популярности',
} as const;

export enum DirectionFlowCatalog {
  Up = 'Up',
  Down = 'Down'
}

export const DirectionFlowMap = {
  Up: 'По возрастанию',
  Down: 'По убыванию'
} as const;

export const PAGES_PER_COUNT = 3;

export const ESCAPE_KEY_NAME = 'Escape';

export const REVIEWS_PER_COUNT = 3;

export const RATING_TITLES = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export const RATE_COUNT = 5;

export const MAX_COUNT_PER_PAGE = 9;

export const MIN_COUNT_SEARCH_RESULTS = 3;
export const NAME_KEY_ENTER = 'Enter';

