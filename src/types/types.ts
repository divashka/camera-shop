import { store } from '../store/store';

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

type ProductType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

type ProductCategory = 'Видеокамера' | 'Фотоаппарат';

type ProductLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type CameraSlice = {
  products: Product[];
  isLoadingProducts: boolean;
  isLoadingOneProduct: boolean;
  oneProduct: Product | null;
  error: boolean;
  similarProducts: Product[];
}

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;
