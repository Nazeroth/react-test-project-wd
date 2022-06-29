import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionType } from './common';

export const getRates = createAsyncThunk(ActionType.GET_RATIO, async (_, thunkAPI) => {
  const link = 'https://api.exchangerate.host/convert?from=UAH&to=';
  const currencies = ['USD', 'EUR', 'PLN'];
  try {
    const responses = await Promise.all(
      currencies.map(async (currency) => {
        const response = await axios.get(link + currency);
        return { currency, ratio: response.data.result };
      }),
    );
    return responses;
  } catch (e) {
    return thunkAPI.rejectWithValue('Cant load data');
  }
});

export const setUahRatio = createAction(ActionType.SET_UAH_RATIO, (uahRatio: number) => {
  return { payload: uahRatio };
});
