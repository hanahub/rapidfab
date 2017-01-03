import React, { PropTypes }   from "react"
import * as BS                from 'react-bootstrap'
import Fa                     from 'react-fontawesome'
import { FormattedMessage }   from 'react-intl'
import Error                  from 'rapidfab/components/error'
import Grid, {
  IdColumn,
  StatusColumn,
} from 'rapidfab/components/grid'

const modelerMapping = {
  idle: {
    status: "success",
    message: "The modeler is idle",
  },
  offline: {
    status: "primary",
    message: "The modeler is printing",
  },
  error: {
    status: "danger",
    message: "the modeler is in error",
  },
}

const PrintersGrid = ({ printers, locations, printerTypes, modelers }) => (
  <Grid
    data={printers}
    columns={[
      'id',
      'modeler',
      'name',
      'location',
      'printer_type'
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("printer"),
      locked: true
    }, {
      columnName: "name",
      displayName: <FormattedMessage id='field.name' defaultMessage="Name"/>
    }, {
      displayName: <FormattedMessage id="field.type" defaultMessage='Type'/>,
      columnName: "printer_type",
      customComponent: IdColumn("printer-type", "printer_type", printerTypes, "name"),
    }, {
      displayName: <FormattedMessage id="field.location" defaultMessage='Location'/>,
      columnName: "location",
      customComponent: IdColumn("location", "location", locations, "name"),
    }, {
      displayName: <FormattedMessage id="field.status" defaultMessage='Status'/>,
      columnName: "modeler",
      customComponent: StatusColumn("modeler", modelers, modelerMapping),
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Printers = ({ printers, locations, printerTypes, modelers, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active={true}>
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/printers">
            <Fa name='print'/> <FormattedMessage id="inventory.printers" defaultMessage='Printers'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/printer" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.printer.add" defaultMessage='Add Printer'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors}/>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <PrintersGrid printers={printers} locations={locations} printerTypes={printerTypes} modelers={modelers}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Printers
