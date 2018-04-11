import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';

const DateTimeColumn = ({ value }) => (
  <span>
    {value ? (
      <FormattedDateTime value={value} />
    ) : (
      <FormattedMessage id="notAvailable" defaultMessage="N/A" />
    )}
  </span>
);

DateTimeColumn.defaultProps = { value: null };
DateTimeColumn.propTypes = { value: PropTypes.string };

export default DateTimeColumn;
