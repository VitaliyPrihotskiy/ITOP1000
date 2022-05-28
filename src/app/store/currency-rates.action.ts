import { createAction, props } from '@ngrx/store';
import { CurrencyRate } from '../models/currency-rate.model';

function scoped(templateString: TemplateStringsArray) {
  return `Currency Rates: ${templateString[0]}`;
}

export const loadCurrencyRates = createAction(scoped`Load Currency Rates`);

export const loadCurrencyRatesSuccess = createAction(
  scoped`Load Currency Rates Success`,
  props<{ currencyRates: CurrencyRate[] }>(),
);

export const loadCurrencyRatesFailure = createAction(
  scoped`Load Currency Rates Failure`,
  props<{ error: unknown }>(),
);

export const loadCurrencyRateSuccess = createAction(
  scoped`Load Currency Rate Success`,
  props<{ currencyRate: CurrencyRate }>(),
);

export const loadCurrencyRateFailure = createAction(
  scoped`Load Currency Rate Failure`,
  props<{ error: unknown }>(),
);

export const setFirstCurrency = createAction(
  scoped`Set First Currency`,
  props<{ firstCurrency: CurrencyRate }>(),
);

export const setSecondCurrency = createAction(
  scoped`Set Second Currency`,
  props<{ secondCurrency: CurrencyRate }>(),
);

export const setFirstCurrencyValue = createAction(
  scoped`Set First Currency Value`,
  props<{ firstCurrencyValue: number }>(),
);

export const setSecondCurrencyValue = createAction(
  scoped`Set Second Currency Valuet`,
  props<{ secondCurrencyValue: number }>(),
);
