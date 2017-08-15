import React from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import { FormattedMessage, FormattedDateTime } from 'rapidfab/i18n';
import ModelerStatus from 'rapidfab/components/modelerStatus';

const listBodyStyle = {
  height: 150,
  verflowY: 'scroll',
  overflowX: 'hidden',
};

const PrinterItem = ({ printer, modelers, selected, onSelect }) => {
  const modeler = _.find(modelers, ['uri', printer.modeler]);
  return (
    <BS.ListGroupItem bsStyle={selected && selected.uri === printer.uri ? 'info' : null} onClick={() => onSelect(printer)}>
      <BS.Row>
        <BS.Col xs={3}>
          <a href={`#/records/printer/${printer.uuid}`}>
            {printer.name}
          </a>
        </BS.Col>
        <BS.Col xs={3}>
          <a href={`#/records/printer-type/${printer.printer_type.uuid}`}>
            {printer.printer_type.name}
          </a>
        </BS.Col>
        <BS.Col xs={2}>
          {`${printer.printer_type.build_volume.x}mm x ${printer.printer_type.build_volume.y}mm`}
        </BS.Col>
        <BS.Col xs={2}>
          <span style={{ textTransform: 'capitalize' }}>
            <ModelerStatus modeler={modeler} />
          </span>
        </BS.Col>
        <BS.Col xs={2}>
          {printer.leadTime ?
            <FormattedDateTime value={printer.leadTime} /> :
            (<em><FormattedMessage id="notAvailable" defaultMessage="N/A" /></em>)
          }
        </BS.Col>
      </BS.Row>
    </BS.ListGroupItem>
  );
};

const PrintersList = ({ printers, modelers, selected, onSelect }) => (
  <BS.Panel header="Printers">
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={3}>
            Printer
          </BS.Col>
          <BS.Col xs={3}>
            Type
          </BS.Col>
          <BS.Col xs={2}>
            Bed Volume
          </BS.Col>
          <BS.Col xs={2}>
            Status
          </BS.Col>
          <BS.Col xs={2}>
            Lead Time
          </BS.Col>
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

export default PrintersList;
