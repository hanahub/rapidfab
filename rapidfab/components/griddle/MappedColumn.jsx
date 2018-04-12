import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'rapidfab/i18n';

const MappedColumn = ({ mapping, value }) => (
  <span>
    {mapping[value] ? (
      mapping[value]
    ) : (
      <FormattedMessage id="notAvailable" defaultMessage="N/A" />
    )}
  </span>
);

MappedColumn.propTypes = {
  mapping: PropTypes.shape({}).isRequired,
  value: PropTypes.string.isRequired,
};

export default MappedColumn;
