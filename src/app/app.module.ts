import {
  CURRENCY_RATES_FEATURE_KEY,
  reducer,
} from './store/currency-rates.reducer';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyRatesEffect } from './store/currency-rates.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ModulesModule } from './modules/modules.module';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AutocompleteLibModule,
    EffectsModule.forFeature([CurrencyRatesEffect]),
    EffectsModule.forRoot([]),
    HttpClientModule,
    ModulesModule,
    StoreModule.forFeature(CURRENCY_RATES_FEATURE_KEY, reducer),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 100,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
