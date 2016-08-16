import React, { Component } from "react"
import _                                      from "lodash";
import * as BS                                from 'react-bootstrap';

const Errors = ({ errors }) => (
  <div>
    {_.map(errors, (error, index) => (
      <BS.Alert bsStyle="danger" className='error-alert' key={index}>
        <p>{error.title}</p>
      </BS.Alert>
    ))}
  </div>
)

export default Errors
