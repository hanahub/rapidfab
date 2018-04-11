import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'rapidfab/i18n';
import StatusDot from 'rapidfab/components/statusDot';

const StatusColumn = ({ modelers, value }) => {
  const modeler = modelers[value];
  return modeler ? (
    <StatusDot status={modeler.status} />
  ) : (
    <FormattedMessage id="notAvailable" defaultMessage="N/A" />
  );
};

StatusColumn.propTypes = {
  modelers: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
};

export default StatusColumn;
