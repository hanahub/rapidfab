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
    // errors do not have unique identifiers,
    // so we must use the index
    /* eslint-disable react/no-array-index-key */
    return (
      <div>
        {errors.map((error, index) => (
          <Alert
            bsStyle="danger"
            className="error-alert"
            key={`${index}-${error.code}`}
          >
            <p>{error.title || error.code}</p>
          </Alert>
        ))}
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

FlashMessages.defaultProps = { errors: [] };
FlashMessages.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
};

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
