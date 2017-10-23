import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { connect } from 'react-redux';
import { Button, Panel, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';

import Event from './Event';

const hiddenEvents = ['bureau', 'model_permission'];

const filterEvents = events => {
  const eventCreationTime = events.map(event => event.created).sort()[0];
  return events.filter(event => {
    const isVisibleEvent = !hiddenEvents.includes(event.key);
    const isUpdateEvent = event.creation !== eventCreationTime;
    const isFullEvent =
      event.current_value !== null && event.previous_value !== null;
    const isRealEvent = event.current_value !== event.previous_value;
    return isVisibleEvent && isUpdateEvent && isFullEvent && isRealEvent;
  });
};

const ExportButton = ({ download, loadingReport, onExport }) => {
  if (download !== 'none') {
    return (
      <a href={download} download>
        <Button bsStyle="success" className="pull-right">
          <FormattedMessage
            id="record.print.download"
            defaultMessage="Download Report"
          />
        </Button>
      </a>
    );
  } else if (loadingReport) {
    return (
      <Button bsStyle="primary" className="pull-right">
        <Fa name="spinner" spin />
      </Button>
    );
  }
  return (
    <Button bsStyle="primary" onClick={onExport} className="pull-right">
      <FormattedMessage
        id="record.print.export"
        defaultMessage="Export Report"
      />
    </Button>
  );
};

ExportButton.propTypes = {
  download: PropTypes.string.isRequired,
  loadingReport: PropTypes.bool.isRequired,
  onExport: PropTypes.func.isRequired,
};

class TraceabilityReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingReport: false,
    };

    this.onExport = this.onExport.bind(this);
  }

  onExport() {
    const { print } = this.props;
    this.props.dispatch(
      Actions.Api.wyatt['traceability-report'].post({ print: print.uri })
    );
    this.setState({ loadingReport: true });
  }

  render() {
    const { onExport } = this;
    const { download, events } = this.props;
    const { loadingReport } = this.state;
    const visibleEvents = filterEvents(events);
    return (
      <Panel header="Traceability Report">
        <ExportButton
          download={download}
          loadingReport={loadingReport}
          onExport={onExport}
        />
        <ListGroup fill>
          {visibleEvents.map(event => <Event event={event} key={event.uuid} />)}
        </ListGroup>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  const print = state.resources[state.routeUUID];
  const events = Selectors.getEventsForPrintSortedByCreated(state, print);
  const report = Selectors.getTraceabilityReportForPrint(state, print);
  const download = report && report.content ? report.content : 'none';
  return { events, print, download, report };
};

TraceabilityReport.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  download: PropTypes.string.isRequired,
  print: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(TraceabilityReport);
