import React, { Component } from "react"
import _                                      from "lodash";
import * as BS                                from 'react-bootstrap';

const Error = ({ errors }) => {
  let errorList = _.map(errors, error => (
    <BS.Alert bsStyle="danger" className='error-alert'>
      <p>{error}</p>
    </BS.Alert>
  ))
  return (
    <div>{errorList}</div>
  )
}

export default Error
