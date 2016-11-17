function make_constants(constants) {
  let result = {};
  for(let i = 0; i < constants.length; i++) {
    let constant = constants[i];
    result[constant] = constant;
  }
  return result;
}

const Constants = [
  'DOWNLOAD_MODEL_CONTENT',
  'DOWNLOAD_MODEL_REQUEST',
  'DOWNLOAD_MODEL_SUCCESS',
  'DOWNLOAD_MODEL_FAILURE',
  'HASH_CHANGE',
  'LOCALE_CHANGE',
  'EVENT_STREAM_MESSAGE',
  'RESOURCE_POST_REQUEST',
  'RESOURCE_POST_SUCCESS',
  'RESOURCE_POST_FAILURE',
  'RESOURCE_PUT_REQUEST',
  'RESOURCE_PUT_SUCCESS',
  'RESOURCE_PUT_FAILURE',
  'RESOURCE_LIST_REQUEST',
  'RESOURCE_LIST_SUCCESS',
  'RESOURCE_LIST_FAILURE',
  'RESOURCE_GET_REQUEST',
  'RESOURCE_GET_SUCCESS',
  'RESOURCE_GET_FAILURE',
  'RESOURCE_DELETE_REQUEST',
  'RESOURCE_DELETE_SUCCESS',
  'RESOURCE_DELETE_FAILURE',
  'UPLOAD_MODEL_STORE_ORDER_PAYLOAD',
  'UPLOAD_MODEL_CLEAR',
  'UPLOAD_MODEL_PROGRESS',
  'UPLOAD_MODEL_REQUEST',
  'UPLOAD_MODEL_FAILURE',
  'UPLOAD_MODEL_SUCCESS',
  'UPLOAD_MODEL_ADD_ERROR',
  'SET_PAGE',
  'CLEAR_UI_STATE',
]

export const Currencies = [
  'USD', 'GBP', 'JPY', 'EUR',
]

/* Guess you guys aren't ready for that yet, But your kids are gonna love it.
export const Currencies = [
  'AED', 'AFN', 'ALL', 'AMD',
  'ANG', 'AOA', 'ARS', 'AUD',
  'AWG', 'AZN', 'BAM', 'BBD',
  'BDT', 'BGN', 'BHD', 'BIF',
  'BMD', 'BND', 'BOB', 'BOV',
  'BRL', 'BSD', 'BTN', 'BWP',
  'BYR', 'BZD', 'CAD', 'CDF',
  'CHE', 'CHF', 'CHW', 'CLF',
  'CLP', 'CNY', 'COP', 'COU',
  'CRC', 'CUP', 'CVE', 'CYP',
  'CZK', 'DJF', 'DKK', 'DOP',
  'DZD', 'EEK', 'EGP', 'ERN',
  'ETB', 'EUR', 'FJD', 'FKP',
  'GBP', 'GEL', 'GHS', 'GIP',
  'GMD', 'GNF', 'GTQ', 'GYD',
  'HKD', 'HNL', 'HRK', 'HTG',
  'HUF', 'IDR', 'ILS', 'INR',
  'IQD', 'IRR', 'ISK', 'JMD',
  'JOD', 'JPY', 'KES', 'KGS',
  'KHR', 'KMF', 'KPW', 'KRW',
  'KWD', 'KYD', 'KZT', 'LAK',
  'LBP', 'LKR', 'LRD', 'LSL',
  'LTL', 'LVL', 'LYD', 'MAD',
  'MDL', 'MGA', 'MKD', 'MMK',
  'MNT', 'MOP', 'MRO', 'MTL',
  'MUR', 'MVR', 'MWK', 'MXN',
  'MXV', 'MYR', 'MZN', 'NAD',
  'NGN', 'NIO', 'NOK', 'NPR',
  'NZD', 'OMR', 'PAB', 'PEN',
  'PGK', 'PHP', 'PKR', 'PLN',
  'PYG', 'QAR', 'RON', 'RSD',
  'RUB', 'RWF', 'SAR', 'SBD',
  'SCR', 'SDG', 'SEK', 'SGD',
  'SHP', 'SLL', 'SOS', 'SRD',
  'STD', 'SVC', 'SYP', 'SZL',
  'THB', 'TJS', 'TMM', 'TND',
  'TOP', 'TRY', 'TTD', 'TWD',
  'TZS', 'UAH', 'UGX', 'USD',
  'USN', 'USS', 'UYI', 'UYU',
  'UZS', 'VEF', 'VND', 'VUV',
  'WST', 'XAF', 'XAG', 'XAU',
  'XBA', 'XBB', 'XBC', 'XBD',
  'XCD', 'XDR', 'XFO', 'XFU',
  'XOF', 'XPD', 'XPF', 'XPT',
  'XTS', 'XXX', 'YER', 'ZAR',
  'ZMK', 'ZWD',
]*/

export default make_constants(Constants)
