import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { FormattedMessage }   from 'react-intl';
import Grid, { IdColumn }     from 'rapidfab/components/grid';

const ManufacturersGrid = ({ records }) => (
  <Grid
    data={records}
    columns={[
      "id",
      "name",
      "commercialContact",
      "commercialPhone",
      "supportContact",
      "supportPhone"
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("manufacturer"),
      locked: true
    }, {
      columnName: "commercialContact",
      displayName: <FormattedMessage id="field.commercialContact" defaultMessage='Commercial Contact'/>
    }, {
      columnName: "commercialPhone",
      displayName: <FormattedMessage id="field.commercialPhone" defaultMessage='Commercial Phone'/>
    }, {
      columnName: "supportContact",
      displayName: <FormattedMessage id="field.supportContact" defaultMessage='Support Contact'/>
    }, {
      columnName: "supportPhone",
      displayName: <FormattedMessage id="field.supportPhone" defaultMessage='Support Phone'/>
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Manufacturers = ({ records, fetching, errors }) => (
  <BS.Grid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/inventory">
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/manufacturer">
            <Fa name='industry'/> <FormattedMessage id="inventory.manufacturers" defaultMessage='Manufacturers'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/manufacturer" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.manufacturer.add" defaultMessage='Add Manufacturer'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <ManufacturersGrid records={records}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Manufacturers
