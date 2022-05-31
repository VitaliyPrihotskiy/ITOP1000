import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { CurrencyRatesService } from '../services/currency-rates.service';
import {
  loadCurrencyRate,
  loadCurrencyRateFailure,
  loadCurrencyRates,
  loadCurrencyRatesFailure,
  loadCurrencyRatesSuccess,
  loadCurrencyRateSuccess,
  setFirstCurrencyValue,
  setSecondCurrencyValue,
} from './currency-rates.action';
import {
  getCurrencyRate,
  getFirstCurrency,
  getSecondCurrency,
} from './currency-rates.selectors';

@Injectable()
export class CurrencyRatesEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly currencyRatesService: CurrencyRatesService,
    private readonly store: Store,
  ) { }

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

  loadCurrencyRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyRate),
      withLatestFrom(
        this.store.select(getFirstCurrency),
        this.store.select(getSecondCurrency),
      ),
      switchMap(([, firstCurrency, secondCurrency]) => {
        return this.currencyRatesService.getCurrencyRate(firstCurrency, secondCurrency).pipe(
          filter(isDefined),
          map((currencyRate) => loadCurrencyRateSuccess({ currencyRate })),
          catchError((error) => {
            return of(loadCurrencyRateFailure(error));
          }),
        );
      }),
    ),
  );

  changeSecondCurrencyValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setFirstCurrencyValue),
      withLatestFrom(
        this.store.select(getCurrencyRate),
      ),
      tap(console.log),
      filter(([{ changeSecondValue }, currencyRate]) => !!changeSecondValue && isDefined(currencyRate)),
      map(([{ firstCurrencyValue }, currencyRate]) => {
        const secondCurrencyValue = firstCurrencyValue * (currencyRate?.rate || 0)
        return setSecondCurrencyValue({ secondCurrencyValue });
      }),
    ),
  );

  changeFirstCurrencyValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSecondCurrencyValue),
      withLatestFrom(
        this.store.select(getCurrencyRate),
      ),
      filter(([{ changeFirstValue }, currencyRate]) => !!changeFirstValue && isDefined(currencyRate)),
      map(([{ secondCurrencyValue }, currencyRate]) => {
        const firstCurrencyValue = secondCurrencyValue * (currencyRate?.inverseRate || 0)
        return setFirstCurrencyValue({ firstCurrencyValue });
      }),
    ),
  );
}

const isDefined = <T>(arg: T | null | undefined): arg is T => {
  return arg !== null && arg !== undefined;
};
