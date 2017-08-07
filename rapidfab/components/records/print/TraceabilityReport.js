import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Panel, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

import * as Selectors from 'rapidfab/selectors';

import Event from './Event';

const hiddenEvents = [
  'bureau',
  'model_permission',
];

const filterEvents = (events) => {
  const eventCreationTime = events.map(event => event.created).sort()[0];
  return events.filter((event) => {
    const isVisibleEvent = !hiddenEvents.includes(event.key);
    const isUpdateEvent = event.creation !== eventCreationTime;
    const isFullEvent = (
      event.current_value !== null && event.previous_value !== null
    );
    const isRealEvent = (
      event.current_value !== event.previous_value
    );
    return isVisibleEvent && isUpdateEvent && isFullEvent && isRealEvent;
  });
};

const TraceabilityReport = ({ print, events, onExport }) => {
  const visibleEvents = filterEvents(events);
  return (
    <Panel header="Traceability Report">
      <Button
        bsStyle="primary"
        onClick={() => { onExport(print); }}
        className="pull-right"
      >
        <FormattedMessage
          id="button.exportDoc"
          defaultMessage="Export Doc"
        />
      </Button>
      <ListGroup fill>
        { visibleEvents.map(event => (
          <Event event={event} key={event.uuid} />
        ))}
      </ListGroup>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  const print = state.resources[state.routeUUID];
  const events = Selectors.getEventsForPrint(state, print);
  return { events, print };
};

TraceabilityReport.propTypes = {
  events: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(TraceabilityReport);
