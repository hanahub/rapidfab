import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

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
      dispatch(Actions.Api.hoth.model.list());
      dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt.template.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt.shipping.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.pao.users.list({ group: props.bureau.group }));
      const print = dispatch(Actions.Api.wyatt.print.get(props.uuid));

      // GET model
      print
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
      print.then(response => {
        dispatch(Actions.Api.wyatt.order.get(extractUuid(response.json.order)));
      });

      // GET all related prints
      const prints = print.then(response =>
        dispatch(
          Actions.Api.wyatt.print.list({ line_item: response.json.line_item })
        )
      );

      // LIST events based on collected uris
      Promise.all([print, prints]).then(promises => {
        const uris = [
          promises[0].json.line_item,
          promises[0].json.order,
          ..._.compact(
            promises[1].json.resources.map(resource => resource.run)
          ),
        ];

        _.chunk(uris, 10).map(chunk => {
          dispatch(Actions.Api.wyatt.event.list({ reference: chunk }));
        });
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

  const order = print ? orders.find(order => order.uri === print.order) : null;
  const lineItem = print
    ? lineItems.find(lineItem => lineItem.uri === print.line_item)
    : null;
  const model = lineItem
    ? models.find(model => model.uri === lineItem.model)
    : null;

  const copy = print ? print.copy : null;
  const lineItemProcessSteps = lineItem
    ? Selectors.getPrintsForLineItem(state, lineItem)
    : [];
  const processSteps = lineItemProcessSteps.filter(step => step.copy === copy);

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
  uuid: PropTypes.string,
  print: PropTypes.object,
  fetching: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintContainer);
