import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  Panel,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import * as Selectors from 'rapidfab/selectors';

import {
  FormattedMessage,
  FormattedDate,
} from 'rapidfab/i18n';

const TraceabilityReport = ({
  events,
  lineItems,
  models,
  orders,
  users,
}) => {
  return (
    <Panel header="Traceability Report">
      <ListGroup>
        { events.map(event => (
            <ListGroupItem>
              <FontAwesome name="chevron-right"/>
              {` ${event.key}`}
              <div className="pull-right">
                <FormattedDate value={event.created}/>
              </div>
            </ListGroupItem>
        ))}
      </ListGroup>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  const print = state.resources[state.routeUUID.uuid];
  const events = Selectors.getEventsForPrint(state, print);
  const lineItems = Selectors.getLineItems(state);
  const models = Selectors.getModels(state);
  const orders = Selectors.getOrders(state);
  const users = Selectors.getUsers(state);

  return {
    events,
    lineItems,
    models,
    orders,
    users,
  };
};

export default connect(mapStateToProps)(TraceabilityReport)
