import { CurrencyRate, CurrencyRates, MonobankRate } from '../models/currency-rate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyRatesService {
  constructor(private httpClient: HttpClient) { }

  getCurrencyRates(): Observable<MonobankRate[]> {
    return this.httpClient.get<MonobankRate[]>(
      `https://api.monobank.ua/bank/currency`,
    );
  }
  
  getCurrencyRate(firstCurrency: string, secondCurrency: string): Observable<CurrencyRate | undefined> {
    return this.httpClient.get<CurrencyRates>(
      `${`http://www.floatrates.com/daily`}/${firstCurrency}.json`)
      .pipe(
        map((currencyRates: CurrencyRates) => { return currencyRates.usd.find((currencyRate: CurrencyRate) => currencyRate.alphaCode === secondCurrency) })
      );
  }
}
