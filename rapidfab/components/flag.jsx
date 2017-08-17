import React, { PropTypes } from 'react';

const Flag = ({ type }) => <i className={`famfamfam-flag-${type}`} />;

Flag.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Flag;
