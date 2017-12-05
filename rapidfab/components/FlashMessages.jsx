import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import Actions from 'rapidfab/actions';

class FlashMessages extends Component {
  componentWillUnmount() {
    this.props.dispatch(Actions.UI.clearUIErrors());
  }

  render() {
    const { errors } = this.props;
    return (
      <div>
        {errors.map((error, index) => (
          <Alert bsStyle="danger" className="error-alert" key={index}>
            <p>{error.title || error.code}</p>
          </Alert>
        ))}
      </div>
    );
  }
}

FlashMessages.defaultProps = { errors: [] };
FlashMessages.propTypes = { errors: PropTypes.array };

const mapStateToProps = state => ({
  errors: Object.keys(state.ui).reduce(
    (errors, service) => [
      ...errors,
      ...Object.keys(state.ui[service]).reduce(
        (serviceErrors, resource) => [
          ...serviceErrors,
          ...Object.keys(state.ui[service][resource]).reduce(
            (resourceErrors, method) => [
              ...resourceErrors,
              ...state.ui[service][resource][method].errors,
            ],
            []
          ),
        ],
        []
      ),
    ],
    []
  ),
});

export default connect(mapStateToProps)(FlashMessages);
