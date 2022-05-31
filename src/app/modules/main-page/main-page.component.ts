import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  currencyCode,
  CurrencyRate,
  currencyCodes,
  MonobankRate,
} from 'src/app/models/currency-rate.model';
import {
  getCurrencyRates,
  getError,
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
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

export const INTEGER_REG_EXP = /^[-+]?(\d+)$/;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  readonly ratesStates$ = this.store.select(getCurrencyRates);
  readonly getError$ = this.store.select(getError);

  readonly firstCurrencyValue$ = this.store.select(getFirstCurrencyValue);
  readonly secondCurrencyValue$ = this.store.select(getSecondCurrencyValue);

  currencyForm: FormGroup = new FormGroup({
    firstCurrency: new FormControl("", [Validators.required]),
    secondCurrency: new FormControl("", [Validators.required]),
    firstCurrencyValue: new FormControl("", [Validators.required, Validators.pattern(INTEGER_REG_EXP)]),
    secondCurrencyValue: new FormControl("", [Validators.required, Validators.pattern(INTEGER_REG_EXP)]),
  });

  get firstCurrency(): AbstractControl | null {
    return this.currencyForm.get('firstCurrency');
  };

  get firstCurrencyValue(): AbstractControl | null {
    return this.currencyForm.get('firstCurrencyValue');
  };

  get secondCurrency(): AbstractControl | null {
    return this.currencyForm.get('secondCurrency');
  };

  get secondCurrencyValue(): AbstractControl | null {
    return this.currencyForm.get('secondCurrencyValue');
  };

  public keyword = 'alphaCode';
  public data = currencyCodes;
  public rates = {
    usd: {
      rateBuy: 0,
      rateSell: 0
    },
    euro: {
      rateBuy: 0,
      rateSell: 0
    }
  };

  constructor(
    private readonly store: Store,
    private readonly changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.firstCurrencyValue$.subscribe(value => {
      this.firstCurrencyValue?.setValue(value);
    });

    this.secondCurrencyValue$.subscribe(value => {
      this.secondCurrencyValue?.setValue(value);
    });

    combineLatest([this.firstCurrency?.valueChanges, this.secondCurrency?.valueChanges])
      .subscribe(() => {
        console.log(this.firstCurrency, this.secondCurrency, this.firstCurrency?.valid && this.secondCurrency?.valid);
        this.changeRate();
      })

    this.store.dispatch(loadCurrencyRates());
    this.ratesStates$.subscribe(rates => {
      const dollar = rates.find(currencyRate => currencyRate.currencyCodeA === 840);
      if (dollar) {
        this.rates.usd.rateBuy = dollar.rateBuy;
        this.rates.usd.rateSell = dollar.rateSell;
      }
      const euro = rates.find(currencyRate => currencyRate.currencyCodeA === 978);
      if (euro) {
        this.rates.euro.rateBuy = euro.rateBuy;
        this.rates.euro.rateSell = euro.rateSell;
        this.changeDetector.detectChanges()
      }
    })
  }

  changeRate() {
    if (this.firstCurrency?.valid && this.secondCurrency?.valid) {
      this.store.dispatch(
        loadCurrencyRate(),
      );
    }
  }

  setCurrency(input: currencyCode, isFirst: boolean) {
    if (isFirst) {
      this.store.dispatch(setFirstCurrency({ firstCurrency: input.alphaCode }));
    } else {
      this.store.dispatch(setSecondCurrency({ secondCurrency: input.alphaCode }));
    }
  }

  setCurrencyValue(input: string, isFirst: boolean) {
    if (isFirst) {
      this.store.dispatch(setFirstCurrencyValue({ firstCurrencyValue: +input, changeSecondValue: true }));
    } else {
      this.store.dispatch(setSecondCurrencyValue({ secondCurrencyValue: +input, changeFirstValue: true }));
    }
  }
}
