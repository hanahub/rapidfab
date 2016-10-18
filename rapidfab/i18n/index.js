import React, { PropTypes } from 'react';

import * as ReactIntl       from 'react-intl';

import enLocaleData         from 'react-intl/locale-data/en';
import jaLocaleData         from 'react-intl/locale-data/ja';
import enUSMessages         from 'rapidfab/i18n/en-US.js';
import jaMessages           from 'rapidfab/i18n/ja.js';

ReactIntl.addLocaleData(enLocaleData);
ReactIntl.addLocaleData(jaLocaleData);

export const FormattedTime = ReactIntl.FormattedTime
export const FormattedDate = ReactIntl.FormattedDate
export const FormattedPlural = ReactIntl.FormattedPlural
export const FormattedMessage = ReactIntl.FormattedMessage
export const FormattedNumber = ReactIntl.FormattedNumber

export const FormattedDateTime = ({ value }) => (
  <span>
    <FormattedDate value={value}/> <FormattedTime value={value}/>
  </span>
)

FormattedDateTime.propTypes = {
  value: PropTypes.object.isRequired
}

export const FormattedVolume = ({ value }) => (
  <span>
    <FormattedNumber value={value}/> cm<sup>3</sup>
  </span>
)

FormattedVolume.propTypes = {
  value: PropTypes.number.isRequired
}

export const FormattedDuration = ({ value }) => (
  <span>
    <FormattedNumber value={value}/> <abbr title="Seconds">s</abbr>
  </span>
)

FormattedDuration.propTypes = {
  value: PropTypes.number.isRequired
}

export const FormattedCost = ({ currency, value }) => (
  <FormattedNumber style='currency' currency={currency} value={value}/>
)

FormattedCost.propTypes = {
  value    : PropTypes.number.isRequired,
  currency : PropTypes.string.isRequired
}

export default {
  "en-US": {
    localeData: enLocaleData,
    messages: enUSMessages
  },
  "ja": {
    localeData: jaLocaleData,
    messages: jaMessages
  }
};
