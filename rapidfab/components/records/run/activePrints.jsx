import React from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

const listBodyStyle = {
  height: 243,
  verflowY: 'scroll',
  overflowX: 'hidden',
};

function printBedFill(printer, model) {
  const modelArea = model.size.x * model.size.y;
  const bedArea =
    printer.printer_type.build_volume.x * printer.printer_type.build_volume.y;
  const percentage = _.round(modelArea / bedArea * 100, 2);
  return `${percentage}%`;
}

const Header = ({ onDeactivate }) => (
  <BS.Row>
    <BS.Col xs={6}>Active Prints</BS.Col>
    <BS.Col xs={6}>
      <BS.ButtonToolbar className="pull-right">
        <BS.Button bsSize="small" bsStyle="danger" onClick={onDeactivate}>
          <Fa name="times" />
        </BS.Button>
      </BS.ButtonToolbar>
    </BS.Col>
  </BS.Row>
);

const Item = ({ print, printer, selected, onSelect, orderNamesMap }) => (
  <BS.ListGroupItem>
    <BS.Row>
      <BS.Col xs={1}>
        <input
          type="checkbox"
          onChange={() => onSelect(print)}
          checked={selected}
        />
      </BS.Col>
      <BS.Col xs={3}>
        <a href={`#/records/order/${extractUuid(print.order)}`}>
          {orderNamesMap[print.order].slice(0, 9)}
        </a>
      </BS.Col>
      <BS.Col xs={3}>
        {`${_.round(print.lineItem.model.size.x, 2)} x ${_.round(
          print.lineItem.model.size.y,
          2
        )}`}
      </BS.Col>
      <BS.Col xs={3}>{printBedFill(printer, print.lineItem.model)}</BS.Col>
    </BS.Row>
  </BS.ListGroupItem>
);

const ActivePrints = ({
  prints,
  printer,
  selected,
  onSelect,
  onDeactivate,
  orderNamesMap,
}) => (
  <BS.Panel header={<Header onDeactivate={onDeactivate} />}>
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={1} />
          <BS.Col xs={3}>Order</BS.Col>
          <BS.Col xs={3}>Size</BS.Col>
          <BS.Col xs={3}>Bed Fill</BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      <div style={listBodyStyle}>
        {_.map(prints, print => (
          <Item
            key={print.uuid}
            selected={!!_.find(selected, ['uri', print.uri])}
            print={print}
            onSelect={onSelect}
            printer={printer}
            orderNamesMap={orderNamesMap}
          />
        ))}
      </div>
    </BS.ListGroup>
  </BS.Panel>
);

ActivePrints.defaultProps = {
  onSelect: () => true,
};

export default ActivePrints;
