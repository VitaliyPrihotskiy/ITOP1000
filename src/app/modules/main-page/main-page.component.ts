import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CurrencyRate,
  currencyCodes,
} from 'src/app/models/currency-rate.model';
import {
  getFirstCurrency,
  getFirstCurrencyValue,
  getRatesStates,
  getSecondCurrency,
  getSecondCurrencyValue,
} from 'src/app/store/currency-rates.selectors';
import {
  loadCurrencyRates,
  setFirstCurrency,
  setSecondCurrency,
} from 'src/app/store/currency-rates.action';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  readonly ratesStates$ = this.store.select(getRatesStates).pipe(
    tap((ratesStates) => {
      this.ratesStates = ratesStates;
    }),
  );
  readonly firstCurrency$ = this.store.select(getFirstCurrency);
  readonly secondCurrency$ = this.store.select(getSecondCurrency);
  readonly firstCurrencyValue$ = this.store.select(getFirstCurrencyValue);
  readonly secondCurrencyValue$ = this.store.select(getSecondCurrencyValue);

  public keyword = 'alphaCode';
  public data = currencyCodes;
  private ratesStates: CurrencyRate[] = [];
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCurrencyRates());
  }
  changeRate(input: any) {
    // this.store.dispatch(
    //   setFirstCurrency({ firstCurrency: this.ratesStates$[input] }),
    // );
  }
  changeRateReverse(input: any) {
    console.log(input);
    let alphaCode = input.alphaCode;
    console.log(alphaCode);
    //сервис добавить до ссилки код
    const secondCurrency = this.ratesStates.find(
      (state) => state.currencyCodeA === input.numericCode,
    );

    if (secondCurrency) {
      this.store.dispatch(setSecondCurrency({ secondCurrency }));
    }
  }
}
