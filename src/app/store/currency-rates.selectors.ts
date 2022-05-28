import {
  CURRENCY_RATES_FEATURE_KEY,
  CurrencyRatesState,
} from './currency-rates.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getCurrencyRatesFeatureState = createFeatureSelector<CurrencyRatesState>(
  CURRENCY_RATES_FEATURE_KEY,
);

export const getRatesStates = createSelector(
  getCurrencyRatesFeatureState,
  (state) => state.currencyRates,
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
// export const getRatedSecondValue = createSelector(
//   getCurrencyRatesFeatureState,
//   (state) => state.se,
// );
// export const getRatedSecondValue = createSelector(
//   getFirstCurrency,
//   getSecondCurrency,
//   getFirstCurrencyValue,
//   getSecondCurrencyValue,
//   (firstCurrency, secondCurrency, firstCurrencyValue, secondCurrencyValue) => {
//     return secondCurrencyValue =
//       (secondCurrency.rateCross / firstCurrency.rateCross) * firstCurrencyValue;
//   },
// );

// export const getRatedFirstValue = createSelector(
//   getFirstCurrency,
//   getSecondCurrency,
//   getFirstCurrencyValue,
//   getSecondCurrencyValue,
//   (firstCurrency, secondCurrency, firstCurrencyValue, secondCurrencyValue) => {
//     return firstCurrencyValue =
//       (firstCurrency.rateCross / secondCurrency.rateCross) * secondCurrencyValue;
//   },
// );
