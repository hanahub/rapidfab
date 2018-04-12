import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

const BooleanColumn = ({ value }) => (
  <div style={{ textAlign: 'center' }}>
    <FontAwesome name={value ? 'check-square-o' : 'square-o'} />
  </div>
);

BooleanColumn.propTypes = { value: PropTypes.string.isRequired };

export default BooleanColumn;
