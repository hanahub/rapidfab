import React from 'react';
import PropTypes from 'prop-types';

const CapitalizeColumn = ({ value }) => (
  <span style={{ textTransform: 'capitalize' }}>{value}</span>
);

CapitalizeColumn.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CapitalizeColumn;
