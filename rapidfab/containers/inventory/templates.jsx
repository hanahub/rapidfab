import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';

import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import TemplateComponent from 'rapidfab/components/inventory/templates';

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

const mapStateToProps = state => ({
  bureau: Selectors.getBureauUri(state),
  locations: Selectors.getLocations(state),
  templates: Selectors.getTemplates(state),
  users: Selectors.getUsers(state),
  fetching: isFetchingInitial(state.ui.wyatt.template.list),
});

export default connect(mapStateToProps)(TemplatesContainer);
