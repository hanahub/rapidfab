import React from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import { FormattedDateTime } from 'rapidfab/i18n';
import Fa from 'react-fontawesome';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import { FormattedMessage } from 'rapidfab/i18n';

const Header = ({ onActivate }) => (
  <BS.Row>
    <BS.Col xs={6}>Select Prints for Run</BS.Col>
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

const PrintsList = ({
  prints,
  pager,
  selected,
  onSelect,
  onActivate,
  onPageChange,
  orderNamesMap,
}) => (
  <BS.Panel bsStyle="primary" header={<Header onActivate={onActivate} />}>
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={1} />
          <BS.Col xs={3}>Order</BS.Col>
          <BS.Col xs={3}>Material</BS.Col>
          <BS.Col xs={3}>Created</BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      {_.map(prints, print => (
        <PrintItem
          key={print.uuid}
          selected={!!_.find(selected, ['uri', print.uri])}
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

export default PrintsList;
