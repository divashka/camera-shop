import { FilterCategories, FilterTypes, FilterLevels, KeyFilters } from '../types';

export enum AppRoute {
  Root = '/catalog',
  Product = '/catalog/product/',
  Basket = '/catalog/basket',
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
  Review = 'REVIEW',
  App = 'APP',
  Modal = 'MODAL'
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

export const MAX_COUNT_PRODUCTS = 99;

export const MIN_COUNT_PRODUCTS = 1;

export const MIN_COUNT_SEARCH_RESULTS = 3;

export const MIN_COUNT_DELETE_SEARCH_RESULTS = 1;

export const NAME_KEY_ENTER = 'Enter';

export const NAME_KEY_UP = 'ArrowUp';

export const NAME_PHOTOCAMERA = 'Фотокамера';

export const NAME_PHOTOCAMERA_FROM_SERVER = 'Фотоаппарат';

export const NAME_KEY_DOWN = 'ArrowDown';

export const NAME_KEY_PRODUCTS_STORAGE = 'products';

export const PROMOCODES = ['camera-333', 'camera-444', 'camera-555'] as const;

export const PROMOCODES_MAP: {
  name: (typeof PROMOCODES)[number];
  discont: number;
}[] = [
  {
    name: 'camera-333',
    discont: 10
  },
  {
    name: 'camera-444',
    discont: 10
  },
  {
    name: 'camera-555',
    discont: 15
  }
];

export enum ChangeProductCount {
  Increase = 'increase',
  Decrease = 'decrease',
}

export const FILTER_CATEGORIES: {
  key: KeyFilters;
  name: string;
  label: FilterCategories;
  text: string;
}[] = [
  {
    key: 'cat',
    name: 'photocamera',
    label: 'Фотоаппарат',
    text: 'Фотокамера'
  },
  {
    key: 'cat',
    name: 'videocamera',
    label: 'Видеокамера',
    text: 'Видеокамера'
  },
];

export const FILTER_TYPES: {
  key: KeyFilters;
  category: string[];
  name: string;
  label: FilterTypes;
}[] = [
  {
    key: 'type',
    category: ['Фотоаппарат', 'Видеокамера'],
    name: 'digital',
    label: 'Цифровая'
  },
  {
    key: 'type',
    category: ['Фотоаппарат'],
    name: 'film',
    label: 'Плёночная'
  },
  {
    key: 'type',
    category: ['Фотоаппарат'],
    name: 'snapshot',
    label: 'Моментальная',
  },
  {
    key: 'type',
    category: ['Фотоаппарат', 'Видеокамера'],
    name: 'collection',
    label: 'Коллекционная'
  }
];

export const FILTER_LEVELS: {
  key: KeyFilters;
  name: string;
  label: FilterLevels;
}[] = [
  {
    key: 'lev',
    name: 'zero',
    label: 'Нулевой'
  },
  {
    key: 'lev',
    name: 'non-professional',
    label: 'Любительский'
  },
  {
    key: 'lev',
    name: 'professional',
    label: 'Профессиональный'
  },
];
