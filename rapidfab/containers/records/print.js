import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers'
import Gatekeeper from 'rapidfab/components/gatekeeper';
import PrintComponent from 'rapidfab/components/records/print';

class PrintContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid);
  }

  render() {
    const { apiErrors, fetching, print, order, model } = this.props;
    const loading = fetching || !print || !order;
    return(
      <Gatekeeper errors={apiErrors} loading={loading}>
        <PrintComponent print={print} order={order} model={model} />
      </Gatekeeper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.print.get(uuid))
        .then( response => {
          return dispatch(Actions.Api.wyatt.order.get(extractUuid(response.json.order)));
        })
        .then( response => {
          return dispatch(Actions.Api.hoth.model.get(extractUuid(response.json.model)));
        })
        .catch ( err => {
          window.location.hash = "#/plan/prints";
        });
    },
  }
}

function mapStateToProps(state, props) {
  const uuid = Selectors.getRoute(state, props).uuid;
  const print = Selectors.getRouteResource(state, props);
  const orders = Selectors.getOrders(state, props);
  const models = Selectors.getModels(state, props);
  const apiErrors = Selectors.getResourceErrors(state, 'wyatt.print');

  const order = print ? orders.find( order => order.uri === print.order) : null;
  const model = order ? models.find( model => model.uri === order.model) : null;

  const fetching =
    state.ui.wyatt.print.get.fetching ||
    state.ui.wyatt.order.get.fetching

  return {
    uuid,
    print,
    order,
    model,
    fetching,
    apiErrors,
  }
}
PrintContainer.propTypes = {
  uuid: PropTypes.string,
  print: PropTypes.object,
  fetching: PropTypes.bool,
  apiErrors: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintContainer);
