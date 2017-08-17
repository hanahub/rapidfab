import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import Actions from 'rapidfab/actions';

class FlashMessages extends Component {
  componentWillUnmount() {
    this.props.dispatch(Actions.UI.clearUIState());
  }

  render() {
    const { errors } = this.props;
    return (
      <div>
        {errors.map((error, index) =>
          <Alert bsStyle="danger" className="error-alert" key={index}>
            <p>
              {error.title}
            </p>
          </Alert>
        )}
      </div>
    );
  }
}

FlashMessages.defaultProps = { errors: [] };
FlashMessages.propTypes = { errors: PropTypes.array };

const mapStateToProps = state => {
  let errors = [];
  for (const service in state.ui) {
    for (const resource in state.ui[service]) {
      for (const method in state.ui[service][resource]) {
        errors = errors.concat(state.ui[service][resource][method].errors);
      }
    }
  }
  return { errors };
};

export default connect(mapStateToProps)(FlashMessages);
