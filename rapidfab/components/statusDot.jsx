import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MODELER_STATUS_MAP } from 'rapidfab/mappings';

const StatusDot = ({ status }) => (
  <OverlayTrigger
    placement="right"
    overlay={
      <Tooltip id="tooltip">{MODELER_STATUS_MAP[status].message}</Tooltip>
    }
  >
    <div className={`dot ${MODELER_STATUS_MAP[status].status}`} />
  </OverlayTrigger>
);

StatusDot.defaultProps = { status: 'unknown' };

StatusDot.propTypes = { status: PropTypes.string };

export default StatusDot;
