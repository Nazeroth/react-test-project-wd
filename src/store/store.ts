import { configureStore } from '@reduxjs/toolkit';
import ratesReducer from './rates/reducer';

export const store = configureStore({ reducer: ratesReducer });
