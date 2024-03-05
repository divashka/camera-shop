import { FilterCategories, FilterTypes, FilterLevels, KeyFilters } from '../types';

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
      label: 'Пленочная'
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
