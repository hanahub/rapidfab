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

      // GET model
      printRequest
        .then(response =>
          dispatch(
            Actions.Api.wyatt['line-item'].get(
              extractUuid(response.json.line_item)
            )
          )
        )
        .then(response => {
          dispatch(
            Actions.Api.hoth.model.get(extractUuid(response.json.model))
          );
        });

      // GET order
      printRequest.then(response => {
        dispatch(Actions.Api.wyatt.order.get(extractUuid(response.json.order)));
      });

      // GET all related prints
      const printsRequest = printRequest.then(response =>
        dispatch(
          Actions.Api.wyatt.print.list({ line_item: response.json.line_item })
        )
      );

      // LIST events based on collected uris
      Promise.all([printRequest, printsRequest]).then(([print, prints]) => {
        const {
          line_item: lineItemUri,
          order: orderUri,
          uri: printUri,
        } = print.json;
        const printsUris = prints.json.resources.map(resource => resource.uri);
        const runUris = prints.json.resources.reduce(
          (uris, resource) => (resource.run ? [...uris, resource.run] : uris),
          []
        );
        dispatch(Actions.Api.wyatt.run.list({ uri: runUris }));
        dispatch(Actions.Api.wyatt['run-document'].list({ run: runUris })).then(
          response => {
            const runDocumentUris = response.json.resources.map(
              resource => resource.uri
            );
            const uris = [
              lineItemUri,
              orderUri,
              printUri,
              ...printsUris,
              ...runUris,
              ...runDocumentUris,
            ];
            _.chunk(uris, 10).map(chunk =>
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
