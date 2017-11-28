import React from 'react';
import PropTypes from 'prop-types';
import StatusDot from 'rapidfab/components/statusDot';

const ModelerStatus = ({ modeler }) => {
  if (modeler) {
    return <StatusDot status={modeler.status} message={modeler.message} />;
  }
  return <StatusDot status="unknown" message="Modeler not found" />;
};

ModelerStatus.propTypes = {
  modeler: PropTypes.shape({}).isRequired,
};

export default ModelerStatus;
