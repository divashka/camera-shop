import { Product, Review, State } from '../types';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { SortNames, DirectionFlowCatalog } from '../const/const';

export const mockProduct: Product = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  vendorCode: 'DA4IU67AD5',
  type: 'Коллекционная',
  category: 'Видеокамера',
  description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди оллекционеров и яростных почитателей старинной техники.',
  level: 'Нулевой',
  price: 65000,
  rating: 5,
  reviewCount: 16,
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp'
};

export const mockProducts: Product[] =
  [
    {
      id: 1,
      name: 'Ретрокамера Dus Auge lV',
      vendorCode: 'DA4IU67AD5',
      type: 'Коллекционная',
      category: 'Видеокамера',
      description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо- аппарат.Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
      previewImg: 'img/content/das-auge.jpg',
      level: 'Любительский',
      price: 73450,
      previewImg2x: 'img/content/das-auge@2x.jpg',
      previewImgWebp: 'img/content/das-auge.webp',
      previewImgWebp2x: 'img/content/das-auge@2x.webp',
      rating: 4,
      reviewCount: 99
    },
    {
      id: 2,
      name: 'FastShot MR-5',
      vendorCode: 'JH34KHN895',
      type: 'Моментальная',
      category: 'Фотоаппарат',
      description: 'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
      previewImg: 'img/content/fast-shot.jpg',
      level: 'Любительский',
      price: 18970,
      previewImg2x: 'img/content/fast-shot@2x.jpg',
      previewImgWebp: 'img/content/fast-shot.webp',
      previewImgWebp2x: 'img/content/fast-shot@2x.webp',
      rating: 4,
      reviewCount: 48
    },
    {
      id: 3,
      name: 'Instaprinter P2',
      vendorCode: 'KLU789GH56',
      type: 'Цифровая',
      category: 'Фотоаппарат',
      description: 'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
      previewImg: 'img/content/instaprinter.jpg',
      level: 'Нулевой',
      price: 8430,
      previewImg2x: 'img/content/instaprinter@2x.jpg',
      previewImgWebp: 'img/content/instaprinter.webp',
      previewImgWebp2x: 'img/content/instaprinter@2x.webp',
      rating: 2,
      reviewCount: 58
    }
  ];

export const review: Review = {
  id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
  createAt: '2022-07-09T13:24:57.980Z',
  cameraId: 1,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 5
};

export const makeMockStore = (initialState?: Partial<State>): State => ({
  APP: {
    isWrapperModalOpen: false,
    isReviewModalOpen: false,
    isSuccessReviewModalOpen: false,
    isProductModalOpen: false,
    isSuccessProductModalOpen: false,
  },
  CAMERA: {
    products: [],
    isLoadingProducts: false,
    isLoadingOneProduct: false,
    oneProduct: mockProduct,
    similarProducts: [...mockProducts],
    activeSortItem: SortNames.Popular,
    activeFlowDirection: DirectionFlowCatalog.Up
  },
  REVIEW: {
    reviews: [],
    isLoadingReview: false,
  },
  ...initialState ?? {},
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
