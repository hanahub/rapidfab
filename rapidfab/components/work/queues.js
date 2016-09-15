import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import Error                                  from 'rapidfab/components/error'
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
  return Math.round(max / 3600, 0)
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
  return (
    <th>
      <div style={headerStyle}>
        {`${index}:00`}
      </div>
    </th>
  )
}

const Item = ({ resource, colCount }) => {
  const { queue } = resource
  const resourceType = getResourceType(resource)
  let queueRuns = _.map(queue, value => {
    const estimatedTime = resourceType === "printer" ? value.estimates.time.print : value.estimates.time.post_processing
    const colSpan = Math.round(estimatedTime / 3600, 0)
    const printingStyle = {
      backgroundColor: Colors.Success.color,
    }
    const postProcessorStyle = {
      backgroundColor: Colors.Info.color,
    }
    const linkStyle = {
      padding: "0 10px",
      color: "#fff",
      display: "block"
    }
    return (
      <td style={cellStyle} colSpan={colSpan}>
        <div style={resourceType === "printer" ? printingStyle : postProcessorStyle}>
          <a href={`#/records/run/${value.uuid}`} style={linkStyle}>
            <abbr title={value.uuid} style={{ cursor: "pointer" }}>
              {value.uuid.substr(value.uuid.length - 6)}
            </abbr>
          </a>
        </div>
      </td>
    )
  })
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

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Queues = ({ resources, apiErrors, fetching }) => {
  const colCount = fetching ? 0 : getTimelineColCount(resources)
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
          <Error errors={apiErrors}/>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          {fetching ? <Loading/> : (
            <div style={containerStyle}>
              <div>
                <BS.Table style={tableStyle}>
                  <thead>
                    <tr>
                      <th>
                        Resources
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
          )}
        </BS.Col>
      </BS.Row>

    </BS.Grid>
  )
}

export default Queues
