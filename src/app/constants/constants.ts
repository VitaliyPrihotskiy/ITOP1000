import { CurrencyRate } from "../models/currency-rate.model";

export const initialCurrencyRateState: CurrencyRate = {
  code: '',
  alphaCode: '',
  numericCode: '',
  name: '',
  rate: 0,
  date: '',
  inverseRate: 0,
};

export const alphaCode = {
  usd: 840,
  eur: 978,
};

export const initialDollarEuroRateState = {
  usd: {
    rateBuy: 0,
    rateSell: 0
  },
  eur: {
    rateBuy: 0,
    rateSell: 0
  }
};

export const monobankBackendSite = 'https://api.monobank.ua/bank/currency';
export const backendSite = 'http://www.floatrates.com/daily';

export const currencyCodes = [{ alphaCode: "USD", numericCode: "840" }, { alphaCode: "EUR", numericCode: "978" }, { alphaCode: "GBP", numericCode: "826" }, { alphaCode: "CAD", numericCode: "124" }, { alphaCode: "JPY", numericCode: "392" }, { alphaCode: "AUD", numericCode: "036" }, { alphaCode: "CHF", numericCode: "756" }, { alphaCode: "MXN", numericCode: "484" }, { alphaCode: "UAH", numericCode: "980" }, { alphaCode: "CRC", numericCode: "188" }, { alphaCode: "BZD", numericCode: "084" }, { alphaCode: "GNF", numericCode: "324" }, { alphaCode: "SZL", numericCode: "748" }, { alphaCode: "SOS", numericCode: "706" }, { alphaCode: "ANG", numericCode: "532" }, { alphaCode: "PKR", numericCode: "586" }, { alphaCode: "AZN", numericCode: "944" }, { alphaCode: "PYG", numericCode: "600" }, { alphaCode: "GYD", numericCode: "328" }, { alphaCode: "RWF", numericCode: "646" }, { alphaCode: "ERN", numericCode: "232" }, { alphaCode: "WST", numericCode: "882" }, { alphaCode: "EGP", numericCode: "818" }, { alphaCode: "SGD", numericCode: "702" }, { alphaCode: "VND", numericCode: "704" }, { alphaCode: "IQD", numericCode: "368" }, { alphaCode: "AFN", numericCode: "971" }, { alphaCode: "NAD", numericCode: "516" }, { alphaCode: "SYP", numericCode: "760" }, { alphaCode: "MOP", numericCode: "446" }, { alphaCode: "BAM", numericCode: "977" }, { alphaCode: "INR", numericCode: "356" }, { alphaCode: "TRY", numericCode: "949" }, { alphaCode: "PEN", numericCode: "604" }, { alphaCode: "TMT", numericCode: "934" }, { alphaCode: "SVC", numericCode: "222" }, { alphaCode: "XCD", numericCode: "951" }, { alphaCode: "MWK", numericCode: "454" }, { alphaCode: "GTQ", numericCode: "320" }, { alphaCode: "NOK", numericCode: "578" }, { alphaCode: "LBP", numericCode: "422" }, { alphaCode: "HUF", numericCode: "348" }, { alphaCode: "ISK", numericCode: "352" }, { alphaCode: "GIP", numericCode: "292" }, { alphaCode: "GEL", numericCode: "981" }, { alphaCode: "MKD", numericCode: "807" }, { alphaCode: "AWG", numericCode: "533" }, { alphaCode: "MMK", numericCode: "104" }, { alphaCode: "MVR", numericCode: "462" }, { alphaCode: "VES", numericCode: "928" }, { alphaCode: "NPR", numericCode: "524" }, { alphaCode: "KRW", numericCode: "410" }, { alphaCode: "MRO", numericCode: "478" }, { alphaCode: "COP", numericCode: "170" }, { alphaCode: "BBD", numericCode: "052" }, { alphaCode: "DJF", numericCode: "262" }, { alphaCode: "SLL", numericCode: "694" }, { alphaCode: "KES", numericCode: "404" }, { alphaCode: "AED", numericCode: "784" }, { alphaCode: "PHP", numericCode: "608" }, { alphaCode: "ZAR", numericCode: "710" }, { alphaCode: "MDL", numericCode: "498" }, { alphaCode: "PAB", numericCode: "590" }, { alphaCode: "FJD", numericCode: "242" }, { alphaCode: "CDF", numericCode: "976" }, { alphaCode: "MZN", numericCode: "943" }, { alphaCode: "UGX", numericCode: "800" }, { alphaCode: "BRL", numericCode: "986" }, { alphaCode: "CNY", numericCode: "156" }, { alphaCode: "SAR", numericCode: "682" }, { alphaCode: "TWD", numericCode: "901" }, { alphaCode: "IRR", numericCode: "364" }, { alphaCode: "BOB", numericCode: "068" }, { alphaCode: "LRD", numericCode: "430" }, { alphaCode: "SDG", numericCode: "938" }, { alphaCode: "TOP", numericCode: "776" }, { alphaCode: "VUV", numericCode: "548" }, { alphaCode: "DKK", numericCode: "208" }, { alphaCode: "IDR", numericCode: "360" }, { alphaCode: "TND", numericCode: "788" }, { alphaCode: "NGN", numericCode: "566" }, { alphaCode: "UZS", numericCode: "860" }, { alphaCode: "ETB", numericCode: "230" }, { alphaCode: "TTD", numericCode: "780" }, { alphaCode: "LAK", numericCode: "418" }, { alphaCode: "BWP", numericCode: "072" }, { alphaCode: "KWD", numericCode: "414" }, { alphaCode: "CZK", numericCode: "203" }, { alphaCode: "RON", numericCode: "946" }, { alphaCode: "BYN", numericCode: "933" }, { alphaCode: "TJS", numericCode: "972" }, { alphaCode: "GMD", numericCode: "270" }, { alphaCode: "CVE", numericCode: "132" }, { alphaCode: "AOA", numericCode: "973" }, { alphaCode: "KHR", numericCode: "116" }, { alphaCode: "MAD", numericCode: "504" }, { alphaCode: "ILS", numericCode: "376" }, { alphaCode: "LYD", numericCode: "434" }, { alphaCode: "CLP", numericCode: "152" }, { alphaCode: "BSD", numericCode: "044" }, { alphaCode: "XPF", numericCode: "953" }, { alphaCode: "HNL", numericCode: "340" }, { alphaCode: "SCR", numericCode: "690" }, { alphaCode: "BHD", numericCode: "048" }, { alphaCode: "OMR", numericCode: "512" }, { alphaCode: "MYR", numericCode: "458" }, { alphaCode: "KZT", numericCode: "398" }, { alphaCode: "HTG", numericCode: "332" }, { alphaCode: "BND", numericCode: "096" }, { alphaCode: "KMF", numericCode: "174" }, { alphaCode: "LSL", numericCode: "426" }, { alphaCode: "TZS", numericCode: "834" }, { alphaCode: "BDT", numericCode: "050" }, { alphaCode: "QAR", numericCode: "634" }, { alphaCode: "XOF", numericCode: "952" }, { alphaCode: "AMD", numericCode: "051" }, { alphaCode: "UYU", numericCode: "858" }, { alphaCode: "JMD", numericCode: "388" }, { alphaCode: "SSP", numericCode: "728" }, { alphaCode: "MRU", numericCode: "929" }, { alphaCode: "MNT", numericCode: "496" }, { alphaCode: "HKD", numericCode: "344" }, { alphaCode: "THB", numericCode: "764" }, { alphaCode: "PGK", numericCode: "598" }, { alphaCode: "KGS", numericCode: "417" }, { alphaCode: "MGA", numericCode: "969" }, { alphaCode: "SRD", numericCode: "968" }, { alphaCode: "GHS", numericCode: "936" }, { alphaCode: "CUP", numericCode: "192" }, { alphaCode: "JOD", numericCode: "400" }, { alphaCode: "BGN", numericCode: "975" }, { alphaCode: "RUB", numericCode: "643" }, { alphaCode: "RSD", numericCode: "941" }, { alphaCode: "NIO", numericCode: "558" }, { alphaCode: "SBD", numericCode: "090" }, { alphaCode: "ZMW", numericCode: "967" }, { alphaCode: "YER", numericCode: "886" }, { alphaCode: "SEK", numericCode: "752" }, { alphaCode: "LKR", numericCode: "144" }, { alphaCode: "PLN", numericCode: "985" }, { alphaCode: "HRK", numericCode: "191" }, { alphaCode: "DZD", numericCode: "012" }, { alphaCode: "ARS", numericCode: "032" }, { alphaCode: "STN", numericCode: "930" }, { alphaCode: "BIF", numericCode: "108" }, { alphaCode: "ALL", numericCode: "008" }, { alphaCode: "MUR", numericCode: "480" }, { alphaCode: "DOP", numericCode: "214" }, { alphaCode: "NZD", numericCode: "554" }]

