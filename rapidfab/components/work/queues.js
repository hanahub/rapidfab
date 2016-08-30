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

const alertStyle = {
  padding: 0,
  margin: 0,
  lineHeight: "20px"
}

const Item = ({ printer }) => {
  const { queue } = printer
  let queueRuns = _.reduce(queue, (result, value) => {
    const colSpan = Math.round(value.estimates.time.print / 1800, 0)
    const warmingStyle = {
      backgroundColor: Colors.Warning.color,
      color: "#333",
      textAlign: "center",
    }
    const printingStyle = {
      backgroundColor: Colors.Primary.color,
      color: "#333",
      textAlign: "center",
    }
    const coolingStyle = {
      backgroundColor: Colors.Success.color,
      color: "#333",
      textAlign: "center",
    }
    result.push((
      <td style={cellStyle} colSpan={1}>
        <div style={warmingStyle}>
          <strong>Warming</strong>
        </div>
      </td>
    ))
    result.push((
      <td style={cellStyle} colSpan={colSpan}>
        <div style={printingStyle}>
          <strong>Printing</strong>
        </div>
      </td>
    ))
    result.push((
      <td style={cellStyle} colSpan={1}>
        <div style={coolingStyle}>
          <strong>Cooling</strong>
        </div>
      </td>
    ))
    return result
  }, [])
  if(queueRuns.length < 48) {
    queueRuns.push((
      <td style={cellStyle} colSpan={48 - queueRuns.length}>
      </td>
    ))
  }
  return (
    <tr>
      {queueRuns}
    </tr>
  )
}

const Queues = ({ printers }) => (
  <BS.Grid fluid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/work">
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
                    <em style={{ visibility: "hidden" }}>Printers</em>
                    <p>Printers</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {_.map(printers, printer => (
                  <tr>
                    <td style={cellStyle}>
                      <a href={`#/records/printer/${printer.uuid}`}>
                        {printer.name}
                      </a>
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
                  {_.map(_.range(48), index => (<ItemHeader index={index} />))}
                </tr>
              </thead>
              <tbody>
                {_.map(printers, printer => (<Item printer={printer}/>))}
              </tbody>
            </BS.Table>
          </div>
        </div>
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Queues
