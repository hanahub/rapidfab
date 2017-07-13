import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Panel, ListGroup} from 'react-bootstrap';

import * as Selectors from 'rapidfab/selectors';

import Event from './Event';

const TraceabilityReport = ({ events }) => {
  return (
    <Panel header="Traceability Report">
      <ListGroup fill>
        { events.map(event => (
          <Event event={event} key={event.uuid}/>
        ))}
      </ListGroup>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  const print = state.resources[state.routeUUID.uuid];
  return { events: Selectors.getEventsForPrint(state, print) };
};

TraceabilityReport.propTypes = {
  events: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(TraceabilityReport)
