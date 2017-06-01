import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';
import Loading from 'rapidfab/components/loading';
import Error from 'rapidfab/components/error';
import PrintComponent from 'rapidfab/components/records/print';

class PrintContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid);
  }

  render() {
    const { apiErrors, print } = this.props;
    if (apiErrors.length > 0)
      return <Error errors={apiErrors} />
    else if (!this.props.print)
      return <Loading />
    else
      return <PrintComponent print={this.props.print} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => { dispatch(Actions.Api.wyatt.print.get(uuid)) },
  }
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    print: Selectors.getRouteResource(state, props),
    apiErrors : Selectors.getResourceErrors(state, "wyatt.print"),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintContainer);
