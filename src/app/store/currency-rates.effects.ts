/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CurrencyRatesService } from '../services/currency-rates.service';
import {
  loadCurrencyRates,
  loadCurrencyRatesFailure,
  loadCurrencyRatesSuccess,
  setFirstCurrencyValue,
  setSecondCurrencyValue,
} from './currency-rates.action';
import {
  getFirstCurrency,
  getSecondCurrency,
} from './currency-rates.selectors';

@Injectable()
export class CurrencyRatesEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly currencyRatesService: CurrencyRatesService,
    private readonly store: Store,
  ) {}

  loadCurrencyRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyRates),
      switchMap(() => {
        return this.currencyRatesService.getCurrencyRates().pipe(
          map((currencyRates) => loadCurrencyRatesSuccess({ currencyRates })),
          catchError((error) => {
            return of(loadCurrencyRatesFailure(error));
          }),
        );
      }),
    ),
  );

  changeSecondCurrencyValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setFirstCurrencyValue),
      withLatestFrom(
        this.store.select(getFirstCurrency),
        this.store.select(getSecondCurrency),
      ),
      map(([{ firstCurrencyValue }, firstCurrency, secondCurrency]) => {
        const secondCurrencyValue =
          (firstCurrency.rateCross / secondCurrency.rateCross) *
          firstCurrencyValue;
        return setSecondCurrencyValue({ secondCurrencyValue });
      }),
    ),
  );
}
