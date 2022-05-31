import { CurrencyRate, MonobankRate } from '../models/currency-rate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyRatesService {
  constructor(private httpClient: HttpClient) { }

  getCurrencyRates(): Observable<MonobankRate[]> {
    return this.httpClient.get<MonobankRate[]>(
      `https://api.monobank.ua/bank/currency`,
    );
  };

  getCurrencyRate(firstCurrency: string, secondCurrency: string): Observable<CurrencyRate | undefined> {
    return this.httpClient.get<CurrencyRate[]>(
      `${`http://www.floatrates.com/daily`}/${firstCurrency}.json`)
      .pipe(
        map((currencyRates: CurrencyRate[]) => {
          return Object.values(currencyRates).find((currencyRate: CurrencyRate) => currencyRate.alphaCode === secondCurrency)
        })
      );
  };
}
