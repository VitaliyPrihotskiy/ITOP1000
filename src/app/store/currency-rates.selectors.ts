import {
  CURRENCY_RATES_FEATURE_KEY,
  CurrencyRatesState,
} from './currency-rates.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getCurrencyRatesFeatureState = createFeatureSelector<CurrencyRatesState>(
  CURRENCY_RATES_FEATURE_KEY,
);

export const getCurrencyRates = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.currencyRates,
);

export const getCurrencyRate = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.currencyRate,
);

export const getFirstCurrency = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.firstCurrency,
);

export const getSecondCurrency = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.secondCurrency,
);

export const getFirstCurrencyValue = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.firstCurrencyValue,
);

export const getSecondCurrencyValue = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.secondCurrencyValue,
);

export const getMonobankError = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.monobankError,
);
