import { Action, createReducer, on } from '@ngrx/store';
import {
  CurrencyRate,
  initialCurrencyRateState,
} from '../models/currency-rate.model';
import {
  loadCurrencyRates,
  loadCurrencyRatesFailure,
  loadCurrencyRatesSuccess,
  setFirstCurrency,
  setFirstCurrencyValue,
  setSecondCurrency,
  setSecondCurrencyValue,
} from './currency-rates.action';

export const CURRENCY_RATES_FEATURE_KEY = 'CurrencyRates';

export interface CurrencyRatesState {
  currencyRates: CurrencyRate[];
  isLoading: boolean;
  error: unknown;
  firstCurrency: CurrencyRate;
  secondCurrency: CurrencyRate;
  firstCurrencyValue: number | null;
  secondCurrencyValue: number | null;
}

const initialState: CurrencyRatesState = {
  currencyRates: [],
  isLoading: false,
  error: null,
  firstCurrency: initialCurrencyRateState,
  secondCurrency: initialCurrencyRateState,
  firstCurrencyValue: null,
  secondCurrencyValue: null,
};

const currencyRateReducer = createReducer(
  initialState,
  on(loadCurrencyRates, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadCurrencyRatesSuccess, (state, { currencyRates }) => ({
    ...state,
    currencyRates,
    isLoading: false,
    error: null,
  })),
  on(loadCurrencyRatesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(setFirstCurrency, (state, { firstCurrency }) => ({
    ...state,
    firstCurrency,
  })),
  on(setSecondCurrency, (state, { secondCurrency }) => ({
    ...state,
    secondCurrency,
  })),
  on(setFirstCurrencyValue, (state, { firstCurrencyValue }) => ({
    ...state,
    firstCurrencyValue,
  })),
  on(setSecondCurrencyValue, (state, { secondCurrencyValue }) => ({
    ...state,
    secondCurrencyValue,
  })),
);

export function reducer(state: CurrencyRatesState, action: Action) {
  return currencyRateReducer(state, action);
}
