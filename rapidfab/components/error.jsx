import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

/* eslint-disable react/no-array-index-key */
const Errors = ({ errors }) => (
  <div>
    {errors.map((error, index) => (
      <Alert
        bsStyle="danger"
        className="error-alert"
        key={`${index}-${error.code}`}
      >
        <p>{error.title}</p>
      </Alert>
    ))}
  </div>
);
/* eslint-enable react/no-array-index-key */

Errors.defaultProps = { errors: [] };

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
};

export default Errors;
