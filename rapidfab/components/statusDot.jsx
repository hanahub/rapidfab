import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';

const StatusDot = ({ status, message = null }) => {
  // status:  any one of bootstraps color enums. E.G. "success".
  // message: the string to display on hover

  if (message) {
    const tooltip = <BS.Tooltip id="tooltip">{message}</BS.Tooltip>;
    return (
      <BS.OverlayTrigger placement="right" overlay={tooltip}>
        <div className={`dot ${status}`} />
      </BS.OverlayTrigger>
    );
  }
  return <div className={`dot ${status}`} />;
};

StatusDot.defaultProps = {
  message: null,
  status: null,
};

StatusDot.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
};

export default StatusDot;
