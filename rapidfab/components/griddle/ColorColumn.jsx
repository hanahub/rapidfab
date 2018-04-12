import React from 'react';
import PropTypes from 'prop-types';

const ColorColumn = ({ value }) => (
  <div
    style={{ margin: '0 auto', width: 24, height: 24, backgroundColor: value }}
  />
);

ColorColumn.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ColorColumn;
