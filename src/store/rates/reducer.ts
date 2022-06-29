import { createSlice } from '@reduxjs/toolkit';
import { RatioDto } from '~/common/types/types';
import { getRates, setUahRatio } from './actions';

type State = {
  rates: Array<RatioDto>;
  isLoading: boolean;
  errorMessage: string;
  uahRatio: number;
};

const initialState: State = {
  rates: [],
  isLoading: false,
  errorMessage: '',
  uahRatio: 0,
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
  extraReducers: {
    [getRates.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.rates = action.payload;
    },
    [getRates.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getRates.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [setUahRatio.type]: (state, action) => {
      state.uahRatio = action.payload;
    },
  },
});

export default ratesSlice.reducer;
