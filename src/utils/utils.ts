import { Review } from '../types';
import dayjs from 'dayjs';

export function sortByDate(reviewA: Review, reviewB: Review) {
  return dayjs(reviewB.createAt).valueOf() - dayjs(reviewA.createAt).valueOf();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
