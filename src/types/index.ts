import { store } from '../store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { PROMOCODES } from '../const/const';

export type Features = {
  type: string;
  category: string;
  vendorCode: string;
  level: string;
}

export type Product = {
  id: number;
  name: string;
  vendorCode: string;
  type: ProductType;
  category: ProductCategory;
  description: string;
  level: ProductLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type ProductBasket = Product & {
  count: string;
}

export type Review = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type ReviewData = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type ProductType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

type ProductCategory = 'Видеокамера' | 'Фотоаппарат';

type ProductLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;

export type TabType = 'feature' | 'description';

export type FilterCategories = 'Фотоаппарат' | 'Видеокамера';

export type FilterTypes = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная';

export type FilterLevels = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export type Filters = FilterCategories | FilterTypes | FilterLevels;

export type KeyFilters = 'cat' | 'type' | 'lev';

export type FilterPrice = {
  from: string;
  to: string;
}

export type PromocodeNames = (typeof PROMOCODES)[number];

export type Promocode = {
  name: PromocodeNames | null;
  discont: number;
}

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type PromocodeData = {
  coupon: PromocodeNames;
}

export type OrderData = {
  camerasIds: number[];
  coupon: PromocodeNames | null;
}
