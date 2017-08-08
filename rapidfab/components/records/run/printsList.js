import React, { PropTypes } from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import { FormattedMessage, FormattedDateTime } from 'rapidfab/i18n';
import Fa from 'react-fontawesome';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

const Header = ({ onActivate }) => (
  <BS.Row>
    <BS.Col xs={6}>
      Pending Prints
    </BS.Col>
    <BS.Col xs={6}>
      <BS.ButtonToolbar className="pull-right">
        <BS.Button bsSize="small" bsStyle="primary" onClick={onActivate}>
          <Fa name="arrow-right" />
        </BS.Button>
      </BS.ButtonToolbar>
    </BS.Col>
  </BS.Row>
);

const PrintItem = ({ print, selected, onSelect }) => (
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
          {extractUuid(print.order).slice(-6)}
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

const PrintsList = ({ prints, pager, selected, onSelect, onActivate, onPageChange }) => (
  <BS.Panel header={<Header onActivate={onActivate} />}>
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={1} />
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
      {_.map(prints, print => (
        <PrintItem
          key={print.uuid}
          selected={!!_.find(selected, ['uri', print.uri])}
          print={print}
          onSelect={onSelect}
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
