export interface CurrencyRate {
  code: string;
  alphaCode: string;
  numericCode: string;
  name: string;
  rate: number;
  date: string;
  inverseRate: number;
};

export interface MonobankRate {
  currencyCodeA: number,
  currencyCodeB: number,
  date: number,
  rateSell: number,
  rateBuy: number,
  rateCross: number
};

export interface currencyCode {
  alphaCode: string,
  numericCode: string
};

export interface DollarEuroRate {
  usd: {
    rateBuy: number,
    rateSell: number
  },
  eur: {
    rateBuy: number,
    rateSell: number
  }
};
