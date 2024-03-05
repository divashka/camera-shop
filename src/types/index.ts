import { store } from '../store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { Action } from 'redux';

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

export type FilterTypes = 'Цифровая' | 'Пленочная' | 'Моментальная' | 'Коллекционная';

export type FilterLevels = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export type Filters = FilterCategories | FilterTypes | FilterLevels;

export type KeyFilters = 'cat' | 'type' | 'lev';

