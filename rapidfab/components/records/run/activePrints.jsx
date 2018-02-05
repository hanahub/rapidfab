import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import { FormattedLength, FormattedMessage } from 'rapidfab/i18n';

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
    <BS.Col xs={6}>
      <FormattedMessage id="record.run.prints" defaultMessage="Run Prints" />
    </BS.Col>
    <BS.Col xs={6}>
      <BS.ButtonToolbar className="pull-right">
        <BS.Button bsSize="small" bsStyle="info" onClick={onDeactivate}>
          <FormattedMessage
            id="record.run.remove"
            defaultMessage="Remove Prints"
          />
        </BS.Button>
      </BS.ButtonToolbar>
    </BS.Col>
  </BS.Row>
);

Header.propTypes = { onDeactivate: PropTypes.func.isRequired };

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
        <FormattedLength length={_.round(print.lineItem.model.size.x, 2)} />
        {` x `}
        <FormattedLength length={_.round(print.lineItem.model.size.y, 2)} />
      </BS.Col>
      <BS.Col xs={3}>{printBedFill(printer, print.lineItem.model)}</BS.Col>
    </BS.Row>
  </BS.ListGroupItem>
);

Item.propTypes = {
  print: PropTypes.shape({}).isRequired,
  printer: PropTypes.shape({}).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  orderNamesMap: PropTypes.shape({}).isRequired,
};

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

ActivePrints.propTypes = {
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
  printer: PropTypes.shape({}).isRequired,
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  orderNamesMap: PropTypes.shape({}).isRequired,
};

export default ActivePrints;
