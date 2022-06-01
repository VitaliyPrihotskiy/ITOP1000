import { CurrencyRate, MonobankRate} from '../models/currency-rate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { backendSite, monobankBackendSite } from '../constants/constants'

@Injectable({ providedIn: 'root' })
export class CurrencyRatesService {
  constructor(private httpClient: HttpClient) { }

  getCurrencyRates(): Observable<MonobankRate[]> {
    return this.httpClient.get<MonobankRate[]>(monobankBackendSite);
  };

  getCurrencyRate(firstCurrency: string, secondCurrency: string): Observable<CurrencyRate | undefined> {
    return this.httpClient.get<CurrencyRate[]>(
      `${backendSite}/${firstCurrency}.json`)
      .pipe(
        map((currencyRates: CurrencyRate[]) => {
          return Object.values(currencyRates).find((currencyRate: any) => currencyRate.alphaCode === secondCurrency);
        })
      );
  };
}
