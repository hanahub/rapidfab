import React, { Component } from "react"
import * as BS                                from 'react-bootstrap';
import StatusDot                              from 'rapidfab/components/statusDot';

const ModelerStatus = ({ modeler }) => {
  if(modeler) {
    return <StatusDot status={modeler.status} message={modeler.message} />
  } else {
    return <StatusDot status="unknown" message="Modeler not found" />
  }
}

export default ModelerStatus
