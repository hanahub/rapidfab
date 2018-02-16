import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import StatusDot from 'rapidfab/components/statusDot';
import { FormattedLength } from 'rapidfab/i18n';
import { MODELER_STATUS_MAP } from 'rapidfab/mappings';

const listBodyStyle = {
  height: 150,
  verflowY: 'scroll',
  overflowX: 'hidden',
};

const PrinterItem = ({ printer, modelers, selected, onSelect }) => {
  const modeler = _.find(modelers, ['uri', printer.modeler]);
  return (
    <BS.ListGroupItem
      bsStyle={selected && selected.uri === printer.uri ? 'info' : null}
      onClick={() => onSelect(printer)}
    >
      <BS.Row>
        <BS.Col xs={3}>
          <a href={`#/records/printer/${printer.uuid}`}>{printer.name}</a>
        </BS.Col>
        <BS.Col xs={3}>
          <a href={`#/records/printer-type/${printer.printer_type.uuid}`}>
            {printer.printer_type.name}
          </a>
        </BS.Col>
        <BS.Col xs={3}>
          <FormattedLength length={printer.printer_type.build_volume.x} />
          {` x `}
          <FormattedLength length={printer.printer_type.build_volume.y} />
        </BS.Col>
        <BS.Col xs={3}>
          <span style={{ textTransform: 'capitalize' }}>
            {modeler ? (
              <StatusDot
                status={MODELER_STATUS_MAP[modeler.status].status}
                message={MODELER_STATUS_MAP[modeler.status].message}
              />
            ) : (
              <StatusDot status="unknown" message="Modeler not found" />
            )}
          </span>
        </BS.Col>
      </BS.Row>
    </BS.ListGroupItem>
  );
};

PrinterItem.propTypes = {
  printer: PropTypes.shape({}).isRequired,
  modelers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.shape({}).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const PrintersList = ({ printers, modelers, selected, onSelect }) => (
  <BS.Panel header="Run Printer">
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={3}>Printer</BS.Col>
          <BS.Col xs={3}>Type</BS.Col>
          <BS.Col xs={3}>Bed Volume</BS.Col>
          <BS.Col xs={3}>Status</BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      <div style={listBodyStyle}>
        {_.map(printers, printer => (
          <PrinterItem
            key={printer.uuid}
            selected={selected}
            printer={printer}
            modelers={modelers}
            onSelect={onSelect}
          />
        ))}
      </div>
    </BS.ListGroup>
  </BS.Panel>
);

PrintersList.defaultProps = {
  onSelect: () => true,
};

PrintersList.propTypes = {
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.shape({}).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PrintersList;
