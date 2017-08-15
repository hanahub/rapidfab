import React from 'react';
import StatusDot from 'rapidfab/components/statusDot';

const ModelerStatus = ({ modeler }) => {
  if (modeler) {
    return <StatusDot status={modeler.status} message={modeler.message} />;
  }
  return <StatusDot status="unknown" message="Modeler not found" />;
};

export default ModelerStatus;
