import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://camera-shop.accelerator.pages.academy/';

const TIMEOUT_DURATION = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_DURATION,
  });

  return api;
};
