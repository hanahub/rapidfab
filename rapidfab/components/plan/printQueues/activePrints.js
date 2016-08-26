import React, { PropTypes }                   from "react"
import _                                      from "lodash"
import * as BS                                from 'react-bootstrap'
import { FormattedMessage, FormattedDate }    from 'react-intl';

const listBodyStyle = {
  height: 243,
  verflowY: "scroll",
  overflowX: "hidden"
}

const Item = ({ print, selected, onSelect }) => (
  <BS.ListGroupItem>
    <BS.Row>
      <BS.Col xs={1}>
        <input type="checkbox" />
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
  <BS.Panel header="Active Prints">
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={1}>
            <input type="checkbox" />
          </BS.Col>
          <BS.Col xs={3}>
            Order
          </BS.Col>
          <BS.Col xs={3}>
            Size
          </BS.Col>
          <BS.Col xs={3}>
            Bed Fill
          </BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      <div style={listBodyStyle}>
        {_.map(prints, print => (
          <Item
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
