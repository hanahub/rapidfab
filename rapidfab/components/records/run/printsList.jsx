import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';

import extractUuid from 'rapidfab/utils/extractUuid';

import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';

const Header = ({ onActivate }) => (
  <BS.Row>
    <BS.Col xs={6}>Select Prints</BS.Col>
    <BS.Col xs={6}>
      <BS.ButtonToolbar className="pull-right">
        <BS.Button bsSize="small" bsStyle="success" onClick={onActivate}>
          <FormattedMessage
            id="record.run.addPrints"
            defaultMessage="Add Prints"
          />
        </BS.Button>
      </BS.ButtonToolbar>
    </BS.Col>
  </BS.Row>
);

Header.propTypes = { onActivate: PropTypes.func.isRequired };

const PrintItem = ({ print, selected, onSelect, orderNamesMap }) => (
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
          {orderNamesMap[print.order].slice(0, 7)}
        </a>
      </BS.Col>
      <BS.Col xs={3}>
        <a href={`#/records/material/${print.lineItem.materials.base.uuid}`}>
          {print.lineItem.materials.base.name}
        </a>
      </BS.Col>
      <BS.Col xs={3}>
        <FormattedDateTime value={print.lineItem.created} />
      </BS.Col>
    </BS.Row>
  </BS.ListGroupItem>
);

PrintItem.propTypes = {
  print: PropTypes.shape({}).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  orderNamesMap: PropTypes.shape({}).isRequired,
};

const PrintsList = ({
  prints,
  pager,
  selected,
  onSelect,
  onActivate,
  onPageChange,
  orderNamesMap,
}) => (
  <BS.Panel header={<Header onActivate={onActivate} />}>
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={1} />
          <BS.Col xs={3}>Order</BS.Col>
          <BS.Col xs={3}>Material</BS.Col>
          <BS.Col xs={3}>Created</BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      {prints.map(print => (
        <PrintItem
          key={print.uuid}
          selected={!!selected.find(select => select.uri === print.uri)}
          print={print}
          onSelect={onSelect}
          orderNamesMap={orderNamesMap}
        />
      ))}
      <div style={{ textAlign: 'center' }}>
        <BS.Pagination
          prev
          next
          items={pager.items}
          maxButtons={5}
          activePage={pager.activePage}
          onSelect={onPageChange}
        />
      </div>
    </BS.ListGroup>
  </BS.Panel>
);

PrintsList.defaultProps = {
  onSelect: () => true,
};

PrintsList.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  orderNamesMap: PropTypes.shape({}).isRequired,
  pager: PropTypes.shape({
    activePage: PropTypes.number,
    items: PropTypes.number,
  }).isRequired,
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PrintsList;
