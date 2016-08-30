import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage }                   from 'react-intl';

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
  textAlign: "center"
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
  const date = '8/26/2016'
  const time = `${index}:00`
  const showDate = index % 12 === 0
  return (
    <th>
      <div style={headerStyle}>
        <em style={{ visibility: showDate ? "visible" : "hidden" }}>{date}</em>
        <p>{`${index}:00`}</p>
      </div>
    </th>
  )
}

const Item = ({ run }) => (
  <tr>
    <td style={cellStyle} colSpan={24}>
      Run
    </td>
  </tr>
)

const Queues = ({ runs }) => (
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
                    <em style={{ visibility: "hidden" }}>Resources</em>
                    <p>Resources</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {_.map(runs, run => (
                  <tr>
                    <td style={cellStyle}>
                      Run
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
                  {_.map(_.range(24), index => (<ItemHeader index={index} />))}
                </tr>
              </thead>
              <tbody>
                {_.map(runs, run => (<Item run={run}/>))}
              </tbody>
            </BS.Table>
          </div>
        </div>
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Queues
