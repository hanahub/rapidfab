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
    const { apiErrors, fetching, print, order, lineItem, model, events } = this.props;
    const loading = fetching || !print || !order || !lineItem || !model || !events;
    return(
      <Gatekeeper errors={apiErrors} loading={loading}>
        <PrintComponent print={print} order={order} lineItem={lineItem} model={model} events={events} />
      </Gatekeeper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      const print = dispatch(Actions.Api.wyatt.print.get(uuid))

      // GET model
      print
        .then( response => {
          return dispatch(Actions.Api.wyatt["line-item"].get(extractUuid(response.json.line_item)));
        })
        .then( response => {
          dispatch(Actions.Api.hoth.model.get(extractUuid(response.json.model)));
        });

      // GET order
      print
        .then( response => {
          dispatch(Actions.Api.wyatt.order.get(extractUuid(response.json.order)));
        });

      // GET all related prints
      const prints = print
        .then( response => {
          return dispatch(Actions.Api.wyatt.print.list({line_item: response.json.line_item}))
        });

      // LIST events based on collected uris
      Promise.all([print, prints])
        .then( promises => {
          let uris = [
            promises[0].json.line_item,
            promises[0].json.order,
            ..._.compact(promises[1].json.resources.map( resource => resource.run )),
          ]

          _.chunk(uris, 10).map( chunk => {
            dispatch(Actions.Api.wyatt.event.list({reference: uris}))
          })
        });
    },
  }
}

function mapStateToProps(state, props) {
  const uuid = Selectors.getRoute(state, props).uuid;
  const print = Selectors.getRouteResource(state, props);
  const orders = Selectors.getOrders(state, props);
  const lineItems = Selectors.getLineItems(state, props);
  const models = Selectors.getModels(state, props);
  const events = Selectors.getEventsForPrint(state, print);
  const apiErrors = Selectors.getResourceErrors(state, 'wyatt.print');

  const order = print ? orders.find( order => order.uri === print.order) : null;
  const lineItem = print ? lineItems.find( lineItem => lineItem.uri === print.line_item) : null;
  const model = lineItem ? models.find( model => model.uri === lineItem.model) : null;

  const fetching =
    state.ui.wyatt.print.get.fetching ||
    state.ui.wyatt.print.list.fetching ||
    state.ui.wyatt.order.get.fetching ||
    state.ui.wyatt.event.list.fetching ||
    state.ui.wyatt['line-item'].get.fetching ||
    state.ui.hoth.model.get.fetching

  return {
    uuid,
    print,
    order,
    lineItem,
    events,
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
