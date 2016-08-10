import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { FormattedMessage }   from 'react-intl';
import Grid, {
  IdColumn,
  BooleanColumn,
  CapitalizeColumn,
  ColorColumn,
  NumberColumn
} from 'rapidfab/components/grid';


const StocksGrid = ({ stocks, materials, locations }) => (
  <Grid
    data={stocks}
    columns={[
      'id',
      'material',
      'location',
      'status',
      'quantity',
      'units'
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("stock"),
      locked: true
    }, {
      columnName: "material",
      customComponent: IdColumn("material", "material", materials),
      displayName: <FormattedMessage id='field.material' defaultMessage="Material"/>
    }, {
      columnName: "location",
      customComponent: IdColumn("location", "location", locations),
      displayName: <FormattedMessage id='field.location' defaultMessage="Location"/>
    }, {
      columnName: "status",
      customComponent: CapitalizeColumn,
      displayName: <FormattedMessage id='field.status' defaultMessage="Status"/>
    }, {
      columnName: "quantity",
      customComponent: NumberColumn,
      displayName: <FormattedMessage id='field.quantity' defaultMessage="Quantity"/>
    }, {
      columnName: "units",
      customComponent: CapitalizeColumn,
      displayName: <FormattedMessage id='field.units' defaultMessage="Units"/>
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Stocks = ({ stocks, materials, locations, fetching, errors }) => (
  <BS.Grid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/inventory">
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/stocks">
            <Fa name='tags'/> <FormattedMessage id="inventory.stocks" defaultMessage='Stocks'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/stock" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.stock.add" defaultMessage='Add Stock'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <StocksGrid stocks={stocks} materials={materials} locations={locations}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Stocks