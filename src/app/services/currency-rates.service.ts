import { CurrencyRate } from '../models/currency-rate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyRatesService {
  constructor(private httpClient: HttpClient) {}

  getCurrencyRates(): Observable<CurrencyRate[]> {
    return this.httpClient.get<CurrencyRate[]>(
      `https://api.monobank.ua/bank/currency`,
    );
  }

  getCurrencyRate(id:number): Observable<CurrencyRate> {
    return this.httpClient.get<CurrencyRate>(
      `${`http://www.floatrates.com/daily`}/${id}.json`,
    ).usd;
  }
}
