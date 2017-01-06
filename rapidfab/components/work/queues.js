import React, { PropTypes, Component }        from 'react'
import * as BS                                from 'react-bootstrap'


class Queues extends Component {
  constructor(props) {
    super(props);

    this.fetchResources = this.fetchResources.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  fetchResources(callback) {
    let machines = _.map(this.props.machines, machine => {
      let type = machine.printer_type ? "printer" : "post-processor"
      return {
        id: machine.uri,
        title: machine.name,
        url: `#/records/${type}/${machine.uuid}`,
        status: null,
        type,
      }
    })
    callback(machines)
  }

  fetchEvents(start, end, timezone, callback) {
    let events = _.map(this.props.runs, run => {
      return {
        id: run.uri,
        resourceId: run.printer || run.post_processor,
        title: run.id,
        url: `#/records/run/${run.uuid}`,
        start: run.actuals.start || run.estimates.start,
        end: run.actuals.end || run.estimates.end,
      }
    })
    callback(events)
  }

  componentDidMount() {
    jQuery('#scheduler').fullCalendar({
      editable: false,
      aspectRatio: 1.8,
      scrollTime: '00:00',
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'timelineDay,timelineWeek'
      },
      defaultView: 'timelineDay',
      views: {
        timelineDay: {
          type: 'timeline',
          buttonText: 'Day',
          slotDuration: '00:30',
          slotLabelFormat: [
            'MMMM DD',
            'HH:mm'
          ]
        },
        timelineWeek: {
          type: 'timeline',
          buttonText: 'Week',
          slotDuration: '01:00',
          slotLabelFormat: [
            'MMMM DD',
            'HH:mm'
          ]
        },
      },
      timezone: "local",
      maxTime: "23:59",
      minTime: "00:00",
      navLinks: true,
      resourceAreaWidth: '20%',
      resourceLabelText: 'Machines',
      resources: this.fetchResources,
      events: this.fetchEvents,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      resourceRender: (resourceObj, labelTds, bodyTds) => {
        let icon = resourceObj.type === "printer" ? "print" : "qrcode"
        labelTds.find('.fc-cell-text')
                .wrapInner(`<a href="${resourceObj.url}">`)
                .prepend(`<span class="fa fa-${icon} machine-status ${resourceObj.status}" /> `)
      },
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.machines !== this.props.machines) {
      jQuery('#scheduler').fullCalendar('refetchResources')
    }
    if(prevProps.runs !== this.props.runs) {
      jQuery('#scheduler').fullCalendar('refetchEvents')
    }
  }

  componentWillUnmount() {
    jQuery('#scheduler').fullCalendar('destroy')
  }

  render() {
    return <div id="scheduler" />
  }
}

export default Queues
