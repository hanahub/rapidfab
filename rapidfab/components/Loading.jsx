import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';

const Loading = ({ size }) => (
  <div className="text-center">
    <Fa name="spinner" spin size={size} />
  </div>
);

Loading.defaultProps = {
  size: null,
};

Loading.propTypes = {
  size: PropTypes.string,
};

export default Loading;
