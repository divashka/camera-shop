import { createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types/slices';
import { SliceNameSpace } from '../../const/const';

const initialState: AppSlice = {
  modalIsActive: false
};

export const appReducer = createSlice({
  name: SliceNameSpace.Review,
  initialState,
  reducers: {
    setModalActive: (state) => {
      state.modalIsActive = !state.modalIsActive;
      document.body.classList.toggle('scroll-lock');
    }
  },
});

export const { setModalActive } = appReducer.actions;
