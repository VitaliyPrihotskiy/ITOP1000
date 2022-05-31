import { Action, createReducer, on } from '@ngrx/store';
import {
  CurrencyRate,
  initialCurrencyRateState,
  MonobankRate,
} from '../models/currency-rate.model';
import {
  loadCurrencyRate,
  loadCurrencyRateFailure,
  loadCurrencyRates,
  loadCurrencyRatesFailure,
  loadCurrencyRatesSuccess,
  loadCurrencyRateSuccess,
  setFirstCurrency,
  setFirstCurrencyValue,
  setSecondCurrency,
  setSecondCurrencyValue,
} from './currency-rates.action';

export const CURRENCY_RATES_FEATURE_KEY = 'CurrencyRates';

export interface CurrencyRatesState {
  currencyRates: MonobankRate[];
  currencyRate: CurrencyRate|null;
  isLoading: boolean;
  error: unknown;
  firstCurrency: string;
  secondCurrency: string;
  firstCurrencyValue: number | null;
  secondCurrencyValue: number | null;
}

const initialState: CurrencyRatesState = {
  currencyRates: [],
  currencyRate: null,
  isLoading: false,
  error: null,
  firstCurrency: 'USD',
  secondCurrency: 'EUR',
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
    error:"Failed to load resource: the server responded with a status of 429 ()",
    isLoading: false,
  })),
  on( loadCurrencyRateFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(loadCurrencyRate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadCurrencyRateSuccess, (state, { currencyRate }) => ({
    ...state,
    currencyRate,
    isLoading: false,
    error: null,
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
