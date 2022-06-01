import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { alphaCode, initialDollarEuroRateState } from '../constants/constants';
import { CurrencyRatesService } from '../services/currency-rates.service';
import { isDefined } from '../utiles/utiles';
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
          map((currencyRates) => {
            let rates = initialDollarEuroRateState;
            const dollar = currencyRates.find(currencyRate => currencyRate.currencyCodeA === alphaCode.usd);
            const euro = currencyRates.find(currencyRate => currencyRate.currencyCodeA === alphaCode.eur);

            if (dollar) {
              rates = {
                ...rates, usd: {
                  rateBuy: dollar.rateBuy,
                  rateSell: dollar.rateSell
                }
              }
            }

            if (euro) {
              rates = {
                ...rates, eur: {
                  rateBuy: euro.rateBuy,
                  rateSell: euro.rateSell
                }
              }
            }

            return loadCurrencyRatesSuccess({ currencyRates: rates })
          }),
          catchError(({ error }) => of(loadCurrencyRatesFailure({ error: error.errorDescription }))
          ),
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
      filter(([{ changeSecondValue }, currencyRate]) => !!changeSecondValue && isDefined(currencyRate)),
      map(([{ firstCurrencyValue }, currencyRate]) => {
        const secondCurrencyValue = Math.floor(firstCurrencyValue * (currencyRate?.rate || 0) * 100) / 100
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
        const firstCurrencyValue = Math.floor(secondCurrencyValue * (currencyRate?.inverseRate || 0) * 100) / 100
        return setFirstCurrencyValue({ firstCurrencyValue });
      }),
    ),
  );
}


