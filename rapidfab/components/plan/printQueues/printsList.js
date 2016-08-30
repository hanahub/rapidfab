import React, { PropTypes }                   from "react"
import _                                      from "lodash"
import * as BS                                from 'react-bootstrap'
import { FormattedMessage, FormattedDate }    from 'react-intl';
import Fa                                     from 'react-fontawesome';

const listBodyStyle = {
  height: 500,
  verflowY: "scroll",
  overflowX: "hidden"
}

const Header = ({  }) => (
  <BS.Row>
    <BS.Col xs={6}>
      Pending Order Prints
    </BS.Col>
    <BS.Col xs={6}>
      <BS.ButtonToolbar className="pull-right">
        <BS.Button bsSize="small" bsStyle="primary">
          <Fa name='arrow-right'/>
        </BS.Button>
      </BS.ButtonToolbar>
    </BS.Col>
  </BS.Row>
)

const PrintItem = ({ print, selected, onSelect }) => (
  <BS.ListGroupItem>
    <BS.Row>
      <BS.Col xs={1}>
        <input
          type="checkbox"
          onChange={() => onSelect(print)}
          checked={selected && selected.uri === print.uri}
        />
      </BS.Col>
      <BS.Col xs={3}>
        <a href={`#/records/order/${print.order.uuid}`}>
          {print.order.id}
        </a>
      </BS.Col>
      <BS.Col xs={3}>
        <a href={`#/records/material/${print.order.materials.base.uuid}`}>
          {print.order.materials.base.name}
        </a>
      </BS.Col>
      <BS.Col xs={3}>
        <FormattedDate value={print.order.created}/>
      </BS.Col>
    </BS.Row>
  </BS.ListGroupItem>
)

const PrintsList = ({ prints, selected, onSelect }) => (
  <BS.Panel header={<Header/>}>
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={1}>
          </BS.Col>
          <BS.Col xs={3}>
            Order
          </BS.Col>
          <BS.Col xs={3}>
            Material
          </BS.Col>
          <BS.Col xs={3}>
            Created
          </BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      <div style={listBodyStyle}>
        {_.map(prints, print => (
          <PrintItem
            key={print.uuid}
            selected={selected}
            print={print}
            onSelect={onSelect}
          />
        ))}
      </div>
    </BS.ListGroup>
  </BS.Panel>
)

PrintsList.propTypes = {
  prints: PropTypes.object.isRequired,
  selected: PropTypes.object,
  onSelect: PropTypes.func,
}

PrintsList.defaultProps = {
  onSelect: () => true
}

export default PrintsList