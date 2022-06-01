import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  currencyCode,
} from 'src/app/models/currency-rate.model';
import {
  getCurrencyRates,
  getFirstCurrencyValue,
  getMonobankError,
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
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { currencyCodes, initialDollarEuroRateState } from 'src/app/constants/constants';

const INTEGER_REG_EXP = /^(\d+)$/;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  readonly ratesStates$ = this.store.select(getCurrencyRates);
  readonly getError$ = this.store.select(getMonobankError);
  readonly firstCurrencyValue$ = this.store.select(getFirstCurrencyValue);
  readonly secondCurrencyValue$ = this.store.select(getSecondCurrencyValue);

  readonly currencyForm: FormGroup = new FormGroup({
    firstCurrency: new FormControl("", [Validators.required]),
    secondCurrency: new FormControl("", [Validators.required]),
    firstCurrencyValue: new FormControl("", [Validators.required, Validators.pattern(INTEGER_REG_EXP)]),
    secondCurrencyValue: new FormControl("", [Validators.required, Validators.pattern(INTEGER_REG_EXP)]),
  });

  keyword = 'alphaCode';
  data = currencyCodes;
  rates = initialDollarEuroRateState;

  private readonly destroy$ = new Subject();

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

  constructor(
    private readonly store: Store,
    private readonly changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.store.dispatch(
      loadCurrencyRates(),
    );
    
    this.firstCurrencyValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.firstCurrencyValue?.setValue(value);
      });

    this.secondCurrencyValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.secondCurrencyValue?.setValue(value);
      });

    combineLatest([this.firstCurrency?.valueChanges, this.secondCurrency?.valueChanges])
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.changeRate();
      })
  }

  onChange(): void {
    this.changeDetection.markForCheck();
  }

  changeRate(): void {
    if (this.firstCurrency?.valid && this.secondCurrency?.valid) {
      this.store.dispatch(
        loadCurrencyRate(),
      );
    }
  }

  setCurrency(input: currencyCode, isFirst: boolean): void {
    if (isFirst) {
      this.store.dispatch(setFirstCurrency({ firstCurrency: input.alphaCode }));
    } else {
      this.store.dispatch(setSecondCurrency({ secondCurrency: input.alphaCode }));
    }
  }

  setCurrencyValue(input: string, isFirst: boolean): void {
    if (isFirst) {
      this.store.dispatch(setFirstCurrencyValue({ firstCurrencyValue: +input, changeSecondValue: true }));
    } else {
      this.store.dispatch(setSecondCurrencyValue({ secondCurrencyValue: +input, changeFirstValue: true }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
