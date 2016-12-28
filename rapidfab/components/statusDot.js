import React, { Component } from "react"
import * as BS                                from 'react-bootstrap';

const StatusDot = ({ status, message }) => {
  // status:  any one of bootstraps color enums. E.G. "success".
  // message: the string to display on hover
  let tooltip = <BS.Tooltip id="tooltip">{message}</BS.Tooltip>
  return (
    <BS.OverlayTrigger placement="right" overlay={tooltip}>
      <div className={"dot " + status}></div>
    </BS.OverlayTrigger>
  );
}

export default Errors
