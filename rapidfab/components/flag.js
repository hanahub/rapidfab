import React, { PropTypes } from 'react';
import flags from 'images/famfamfam-flags.png';


const Flag = ({ type }) => (
  <i className={`famfamfam-flag-${type}`} />
);

Flag.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Flag;
