import { PromocodeNames } from '.';

export type FormInputsReview = {
  rating: number;
  ['user-name']: string;
  ['user-plus']: string;
  ['user-minus']: string;
  ['user-comment']: string;
}

export type FormInputsPromo = {
  promo: PromocodeNames;
}
