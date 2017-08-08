import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

const Errors = ({ errors = [] }) => (
  <div>
    { errors.map((error, index) => (
      <Alert bsStyle="danger" className="error-alert" key={index}>
        <p>{error.title}</p>
      </Alert>
    ))}
  </div>
);

export default Errors;
