import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedDate, FormattedMessage }    from 'react-intl';

const Colors = {
  Warning : { color: "#e4d836", hover: "#ccbf1b" },
  Info    : { color: "#9f86ff", hover: "#7753ff" },
  Danger  : { color: "#e64759", hover: "#dc1e33" },
  Success : { color: "#1bc98e", hover: "#159c6e" },
  Default : { color: "#ffffff", hover: "#e6e6e6" },
  Primary : { color: "#1ca8dd", hover: "#1686b0" }
};

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  display: "inline-block"
}

const rightStyle = {
  overflowY: "hidden",
  overflowX: "scroll",
}

const headerStyle = {
  width: 100,
}

const cellStyle = {
  whiteSpace: "nowrap",
  borderBottom: "1px solid #434857",
}

const tableStyle = {
  width: "inherit",
  border: "1px solid #434857",
  float: "left",
}

function getResourceType(resource) {
  if(resource.printer_type) {
    return "printer"
  } else if (resource.post_processor_type) {
    return "post-processor"
  } else if (resource.layout) {
    return "run"
  }
  throw new Error("Could not determine resource type")
}

function getTimelineColCount(resources) {
  const resourceTimes = _.map(resources, resource => {
    return _.sumBy(resource.queue, run => {
      const { print, post_processing } = run.estimates.time
      return (print > post_processing ? print : post_processing) + 3600
    })
  })
  const max = _.max(resourceTimes)
  return Math.round(max / 1800, 0)
}

const ResourceLink = ({ resource }) => {
  let resourceType = getResourceType(resource)
  return (
    <a href={`#/records/${resourceType}/${resource.uuid}`}>
      <Fa name={resourceType === "printer" ? "print" : "qrcode"}/> {resource.name ? resource.name : resource.id}
    </a>
  )
}

const ItemHeader = ({ index }) => {
  const date = new Date()
  const time = `${index}:00`
  const showDate = index % 12 === 0
  const halfHour = index % 2 === 1
  return (
    <th>
      <div style={headerStyle}>
        <em style={{ visibility: showDate ? "visible" : "hidden" }}>
          <FormattedDate value={date}/>
        </em>
        <p>
          {`${Math.round(index / 2, 0)}:${halfHour ? "30" : "00"}`}
        </p>
      </div>
    </th>
  )
}

const Item = ({ resource, colCount }) => {
  const { queue } = resource
  const resourceType = getResourceType(resource)
  let queueRuns = _.reduce(queue, (result, value) => {
    const estimatedTime = resourceType === "printer" ? value.estimates.time.print : value.estimates.time.post_processing
    const colSpan = Math.round(estimatedTime / 1800, 0)
    const warmingStyle = {
      backgroundColor: resourceType === "printer" ? Colors.Warning.color : Colors.Info.color,
      color: "#333",
      textAlign: "center",
    }
    const printingStyle = {
      backgroundColor: Colors.Default.color,
      color: "#333",
      textAlign: "center",
    }
    const coolingStyle = {
      backgroundColor: resourceType === "printer" ? Colors.Success.color : Colors.Primary.color,
      color: "#333",
      textAlign: "center",
    }
    result.push((
      <td style={cellStyle} colSpan={1}>
        <div style={warmingStyle}>
          {resourceType === "printer" ? "Warming" : "Loading" }
        </div>
      </td>
    ))
    result.push((
      <td style={cellStyle} colSpan={colSpan}>
        <div style={printingStyle}>
          {resourceType === "printer" ? "Printing" : "Post Processing" } <a href={`#/records/run/${value.uuid}`}>{value.id}</a>
        </div>
      </td>
    ))
    result.push((
      <td style={cellStyle} colSpan={1}>
        <div style={coolingStyle}>
          {resourceType === "printer" ? "Cooling" : "Unloading" }
        </div>
      </td>
    ))
    return result
  }, [])
  if(queueRuns.length < colCount) {
    queueRuns.push((
      <td style={cellStyle} colSpan={colCount - queueRuns.length}>
      </td>
    ))
  }
  return (
    <tr>
      {queueRuns}
    </tr>
  )
}

const Queues = ({ resources }) => {
  const colCount = getTimelineColCount(resources)
  return (
    <BS.Grid fluid>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='wrench'/> <FormattedMessage id="work" defaultMessage='Work'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/work/queues">
              <Fa name='list'/> <FormattedMessage id="work.queues" defaultMessage='Queues'/>
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          <div style={containerStyle}>
            <div>
              <BS.Table style={tableStyle}>
                <thead>
                  <tr>
                    <th>
                      <em style={{ visibility: "hidden" }}>Resources</em>
                      <p>Resources</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(resources, resource => (
                    <tr>
                      <td style={cellStyle}>
                        <ResourceLink resource={resource} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </BS.Table>
            </div>
            <div style={rightStyle}>
              <BS.Table style={tableStyle}>
                <thead>
                  <tr>
                    {_.map(_.range(colCount), index => (<ItemHeader index={index} />))}
                  </tr>
                </thead>
                <tbody>
                  {_.map(resources, resource => (<Item resource={resource} colCount={colCount}/>))}
                </tbody>
              </BS.Table>
            </div>
          </div>
        </BS.Col>
      </BS.Row>

    </BS.Grid>
  )
}

export default Queues
