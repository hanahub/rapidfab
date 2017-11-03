import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import TemplateComponent from 'rapidfab/components/inventory/templates';
import * as Selectors from 'rapidfab/selectors';

class TemplatesContainer extends Component {
  componentWillMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt.template.list({ bureau }));
  }

  render() {
    return <TemplateComponent {...this.props} />;
  }
}

TemplatesContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { template } = state.ui.wyatt;

  return {
    bureau: Selectors.getBureauUri(state),
    locations: Selectors.getLocations(state),
    templates: Selectors.getTemplates(state),
    users: Selectors.getUsers(state),
    fetching: template.list.fetching,
    apiErrors: template.list.errors,
  };
}

export default connect(mapStateToProps)(TemplatesContainer);
