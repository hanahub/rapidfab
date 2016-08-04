import React, { Component } from "react"
import _                                      from "lodash";
import * as BS                                from 'react-bootstrap';

const Error = ({ errors }) => {
  let errorList = _.map(errors, error => (
    <BS.Row>
      <BS.Col xs={8} xsOffset={2}>
        <BS.Alert bsStyle="danger" className='error-alert'>
          <p>{error}</p>
        </BS.Alert>
      </BS.Col>
    </BS.Row>
  ))
  return (
    <div>{errorList}</div>
  )
}

export default Error
