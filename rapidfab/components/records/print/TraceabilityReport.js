import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Panel, ListGroup} from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

import * as Selectors from 'rapidfab/selectors';

import Event from './Event';

const hiddenEvents = [
  'bureau',
  'model_permission',
];

const TraceabilityReport = ({ print, events, onExport }) => {
  const visibleEvents = events.filter( event => {
    const isVisibleEvent = !hiddenEvents.includes(event.key);
    const isFullEvent = (
      event.current_value !== null && event.previous_value !== null
    );
    return isVisibleEvent && isFullEvent;
  });
  return (
    <Panel header="Traceability Report">
      <Button
        bsStyle="primary"
        onClick={ () => {onExport(print)} }
        className="pull-right"
      >
        <FormattedMessage
          id="button.exportDoc"
          defaultMessage="Export Doc"
        />
      </Button>
      <ListGroup fill>
        { visibleEvents.map(event => (
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
