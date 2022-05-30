import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CurrencyRate,
  currencyCodes,
  MonobankRate,
} from 'src/app/models/currency-rate.model';
import {
  getCurrencyRates,
  getFirstCurrency,
  getFirstCurrencyValue,
  getSecondCurrency,
  getSecondCurrencyValue,
} from 'src/app/store/currency-rates.selectors';
import {
  loadCurrencyRate,
  loadCurrencyRates,
  setFirstCurrency,
  setFirstCurrencyValue,
  setSecondCurrency,
  setSecondCurrencyValue,
} from 'src/app/store/currency-rates.action';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  readonly ratesStates$? = this.store.select(getCurrencyRates).pipe(
    tap((ratesStates) => {
      this.ratesStates = ratesStates;
    }),
  );
  readonly firstCurrency$ = this.store.select(getFirstCurrency);
  readonly secondCurrency$ = this.store.select(getSecondCurrency);
  readonly firstCurrencyValue$ = this.store.select(getFirstCurrencyValue);
  readonly secondCurrencyValue$ = this.store.select(getSecondCurrencyValue);
  public firstCurrencyValue:FormControl;
  public secondCurrencyValue:FormControl;
  public keyword = 'alphaCode';
  public data = currencyCodes;
  public ratesStates: MonobankRate[] = [];
  constructor(private readonly store: Store) {
    
    this.firstCurrencyValue = new FormControl("", [Validators.required, Validators.pattern(/^\d*\.?\d*$/)])
    this.secondCurrencyValue = new FormControl("", [Validators.required, Validators.pattern(/^\d*\.?\d*$/)])
  
   }

  ngOnInit(): void {
    this.store.dispatch(loadCurrencyRates());
  }

  changeRate() {
    if (this.firstCurrency$ && this.secondCurrency$) {
      this.store.dispatch(
        loadCurrencyRate(),
      );
    }
  }

  setCurrency(input: string, isFirst: boolean) {
    if (isFirst) {
      this.store.dispatch(setFirstCurrency({ firstCurrency: input }));
    } else {
      this.store.dispatch(setSecondCurrency({ secondCurrency: input }));
    }
    this.changeRate();
  }

  setCurrencyValue(input: string, isFirst: boolean) {
    if (this.firstCurrency$ && this.secondCurrency$) {
      if (isFirst) {
        this.store.dispatch(setFirstCurrencyValue({ firstCurrencyValue: +input }));
      } else {
        this.store.dispatch(setSecondCurrencyValue({ secondCurrencyValue: +input }));
      }
      this.changeRate();
    }
    else {
      alert('Оберіть спочатку валюти будь-ласка')
    }
  }
}
