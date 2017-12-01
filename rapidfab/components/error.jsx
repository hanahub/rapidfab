import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Errors = ({ errors }) => (
  <div>
    {errors.map((error, index) => (
      <Alert bsStyle="danger" className="error-alert" key={index}>
        <p>{error.title}</p>
      </Alert>
    ))}
  </div>
);

Errors.defaultProps = { errors: [] };

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
};

export default Errors;
