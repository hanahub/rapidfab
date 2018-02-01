import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as ReactIntl from 'react-intl';

import daLocaleData from 'react-intl/locale-data/da';
import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import jaLocaleData from 'react-intl/locale-data/ja';
import daMessages from 'rapidfab/i18n/da';
import deMessages from 'rapidfab/i18n/de';
import enUSMessages from 'rapidfab/i18n/en-US';
import jaMessages from 'rapidfab/i18n/ja';
import convertVolumeCmToIn from 'rapidfab/utils/convertVolumeCmToIn';

ReactIntl.addLocaleData(daLocaleData);
ReactIntl.addLocaleData(deLocaleData);
ReactIntl.addLocaleData(enLocaleData);
ReactIntl.addLocaleData(jaLocaleData);

export const FormattedTime = ReactIntl.FormattedTime;
export const FormattedDate = ReactIntl.FormattedDate;
export const FormattedPlural = ReactIntl.FormattedPlural;
export const FormattedMessage = ReactIntl.FormattedMessage;
export const FormattedNumber = ReactIntl.FormattedNumber;

export const FormattedDateTime = ({ value }) => (
  <span>
    <FormattedDate value={value} /> <FormattedTime value={value} />
  </span>
);

FormattedDateTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export const FormattedVolume = connect(({ volumeUnits }) => ({ volumeUnits }))(
  ({ value, volumeUnits }) => (
    <span>
      <FormattedNumber
        value={volumeUnits === 'in' ? convertVolumeCmToIn(value) : value}
      />
      {` `}
      {volumeUnits === 'cm' ? 'cm' : 'in'}
      <sup>3</sup>
    </span>
  )
);

FormattedVolume.propTypes = {
  value: PropTypes.number.isRequired,
  // value needs to be a volume measured in cm3
};

export const FormattedDuration = ({ value }) => (
  <span>
    <FormattedNumber value={value} /> <abbr title="Seconds">s</abbr>
  </span>
);

FormattedDuration.propTypes = {
  value: PropTypes.number.isRequired,
};

export const FormattedCost = ({ currency, value }) => (
  <FormattedNumber currency={currency} value={value} />
);

FormattedCost.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default {
  da: {
    localeData: daLocaleData,
    messages: daMessages,
  },
  de: {
    localeData: deLocaleData,
    messages: deMessages,
  },
  'en-US': {
    localeData: enLocaleData,
    messages: enUSMessages,
  },
  ja: {
    localeData: jaLocaleData,
    messages: jaMessages,
  },
};
