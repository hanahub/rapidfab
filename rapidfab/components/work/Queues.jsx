import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import { MODELER_STATUS_MAP } from 'rapidfab/constants';
import Locations from 'rapidfab/components/locations';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';

class Queues extends Component {
  constructor(props) {
    super(props);

    this.fetchResources = this.fetchResources.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    jQuery('#scheduler').fullCalendar({
      editable: false,
      aspectRatio: 1.8,
      scrollTime: '00:00',
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'timelineDay,timelineWeek',
      },
      defaultView: 'timelineDay',
      views: {
        timelineDay: {
          type: 'timeline',
          buttonText: 'Day',
          slotDuration: '00:30',
          slotLabelFormat: ['MMMM DD', 'HH:mm'],
        },
        timelineWeek: {
          type: 'timeline',
          buttonText: 'Week',
          slotDuration: '01:00',
          slotLabelFormat: ['MMMM DD', 'HH:mm'],
        },
      },
      timezone: 'local',
      maxTime: '23:59',
      minTime: '00:00',
      navLinks: true,
      resourceAreaWidth: '20%',
      resourceLabelText: 'Machines',
      resources: this.fetchResources,
      events: this.fetchEvents,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      resourceRender: (resourceObj, labelTds) => {
        const cell = labelTds.find('.fc-cell-text');
        cell.wrapInner(`<a href="${resourceObj.url}">`);
        if (resourceObj.type === 'printer') {
          const status = MODELER_STATUS_MAP[resourceObj.status];
          cell.prepend(
            `<span class="dot ${status.status}" title="${status.message}" /> `
          );
        } else {
          cell.prepend('<span class="fa fa-qrcode" /> ');
        }
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.machines !== this.props.machines) {
      jQuery('#scheduler').fullCalendar('refetchResources');
    }
    if (prevProps.events !== this.props.events) {
      jQuery('#scheduler').fullCalendar('refetchEvents');
    }
  }

  componentWillUnmount() {
    jQuery('#scheduler').fullCalendar('destroy');
  }

  fetchResources(callback) {
    const machines = this.props.machines.map(machine => {
      const type = machine.printer_type ? 'printer' : 'post-processor';
      return {
        id: machine.uri,
        title: machine.name,
        url: `#/records/${type}/${machine.uuid}`,
        status: machine.status,
        type,
      };
    });
    callback(machines);
  }

  fetchEvents(start, end, timezone, callback) {
    callback(this.props.events);
  }

  render() {
    return (
      <div>
        <BreadcrumbNav breadcrumbs={['queues']} />
        <BS.Row>
          <BS.Col xs={4}>
            {this.props.locations.length > 1 ? (
              <Locations
                locations={this.props.locations}
                handleOnChange={this.props.handleOnChange}
                locationFilter={this.props.locationFilter}
              />
            ) : (
              <div />
            )}
          </BS.Col>
        </BS.Row>
        <div id="scheduler" />
      </div>
    );
  }
}

Queues.defaultProps = {
  locationFilter: null,
};

Queues.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      resourceId: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      backgroundColor: PropTypes.string,
      borderColor: PropTypes.string,
    })
  ).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  locationFilter: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  machines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Queues;
