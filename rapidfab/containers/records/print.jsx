import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';
import extractUuid from 'rapidfab/utils/extractUuid';

import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';
import PrintComponent from 'rapidfab/components/records/print/print';

class PrintContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props);
  }

  render() {
    const {
      fetching,
      print,
      order,
      lineItem,
      model,
      events,
      users,
    } = this.props;
    const loading =
      fetching || !print || !order || !lineItem || !model || !events || !users;
    return (
      <div>
        <FlashMessages />
        {loading ? <Loading /> : <PrintComponent {...this.props} />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: props => {
      const { bureau } = props;
      dispatch(Actions.RouteUUID.setRouteUUID(props.route.uuid));
      dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt.template.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt.shipping.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt['process-step'].list());
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt['post-processor-type'].list());
      dispatch(Actions.Api.wyatt.shipping.list());
      dispatch(Actions.Api.pao.users.list());

      const printRequest = dispatch(Actions.Api.wyatt.print.get(props.uuid));

      printRequest.then(printResponse => {
        const {
          copy,
          line_item: lineItemUri,
          order: orderUri,
          run: runUri,
          uri: printUri,
        } = printResponse.json;

        dispatch(Actions.Api.wyatt.order.get(extractUuid(orderUri)));
        if (runUri) {
          dispatch(Actions.Api.wyatt.run.get(extractUuid(runUri)));
        }

        const lineItemRequest = dispatch(
          Actions.Api.wyatt['line-item'].get(extractUuid(lineItemUri), true)
        );
        const orderDocumentsRequest = dispatch(
          Actions.Api.wyatt['order-document'].list({ order: orderUri }, true)
        );
        const printsRequest = dispatch(
          Actions.Api.wyatt.print.list({ line_item: lineItemUri, copy }, true)
        );
        const runDocumentRequest = runUri
          ? dispatch(
              Actions.Api.wyatt['run-document'].list({ run: runUri }),
              true
            )
          : { json: { resources: [] } };
        Promise.all([
          lineItemRequest,
          orderDocumentsRequest,
          printsRequest,
          runDocumentRequest,
        ]).then(
          ([
            lineItemResponse,
            orderDocumentsResponse,
            printsResponse,
            runDocumentsResponse,
          ]) => {
            dispatch(
              Actions.Api.hoth.model.get(
                extractUuid(lineItemResponse.json.model)
              )
            );

            const orderDocumentUris = orderDocumentsResponse.json.resources.map(
              doc => doc.uri
            );
            const printUris = printsResponse.json.resources.map(
              print => print.uri
            );
            const runUris = printsResponse.json.resources.reduce(
              (uris, print) => (print.run ? [...uris, print.run] : uris),
              []
            );
            const runDocumentUris = runDocumentsResponse.json.resources.map(
              doc => doc.uri
            );

            if (runUris.length) {
              dispatch(Actions.Api.wyatt.run.list({ uri: runUris }));
            }
            const eventResourceUris = [
              lineItemUri,
              orderUri,
              ...orderDocumentUris,
              printUri,
              ...printUris,
              runUri,
              ...runUris,
              ...runDocumentUris,
            ];
            _.chunk(_.compact(eventResourceUris), 10).map(chunk =>
              dispatch(Actions.Api.wyatt.event.list({ reference: chunk }, true))
            );
          }
        );
      });
    },
  };
}

function mapStateToProps(state, props) {
  const uuid = Selectors.getRoute(state, props).uuid;
  const print = Selectors.getRouteResource(state, props);
  const orders = Selectors.getOrders(state, props);
  const lineItems = Selectors.getLineItems(state, props);
  const models = Selectors.getModels(state, props);
  const users = Selectors.getUsers(state);
  const bureau = Selectors.getBureau(state);
  const events = Selectors.getEventsForPrint(state, print);
  const processSteps = print
    ? Selectors.getProcessStepsForPrint(state, print)
    : [];

  const order = print ? orders.find(o => o.uri === print.order) : null;
  const lineItem = print
    ? lineItems.find(li => li.uri === print.line_item)
    : null;
  const model = lineItem ? models.find(m => m.uri === lineItem.model) : null;

  const fetching =
    state.ui.wyatt.print.get.fetching ||
    state.ui.wyatt.print.list.fetching ||
    state.ui.wyatt.order.get.fetching ||
    state.ui.wyatt.event.list.fetching ||
    state.ui.wyatt['line-item'].get.fetching ||
    state.ui.hoth.model.get.fetching ||
    state.ui.pao.users.list.fetching;

  return {
    uuid,
    print,
    processSteps,
    order,
    lineItem,
    users,
    bureau,
    events,
    model,
    models,
    fetching,
  };
}

PrintContainer.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  lineItem: PropTypes.shape({}).isRequired,
  model: PropTypes.shape({}).isRequired,
  onInitialize: PropTypes.func.isRequired,
  order: PropTypes.shape({}).isRequired,
  print: PropTypes.shape({}).isRequired,
  processSteps: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  uuid: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintContainer);
