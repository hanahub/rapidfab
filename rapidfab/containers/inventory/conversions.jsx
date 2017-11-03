import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import ConversionsComponent from 'rapidfab/components/inventory/conversions';
import * as Selectors from 'rapidfab/selectors';

class ConversionsContainer extends Component {
  componentWillMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt['currency-conversion'].list({ bureau }));
  }

  render() {
    return <ConversionsComponent {...this.props} />;
  }
}

ConversionsContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const conversion = state.ui.wyatt['currency-conversion'];

  return {
    bureau: Selectors.getBureauUri(state),
    locations: Selectors.getLocations(state),
    conversions: Selectors.getConversions(state),
    users: Selectors.getUsers(state),
    fetching: conversion.list.fetching,
    apiErrors: conversion.list.errors,
  };
}

export default connect(mapStateToProps)(ConversionsContainer);
