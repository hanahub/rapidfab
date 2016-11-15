import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { FormattedMessage }   from 'react-intl';
import Grid, { IdColumn }     from 'rapidfab/components/grid';
import Error                  from 'rapidfab/components/error'

const ShippingsGrid = ({ records }) => (
  <Grid
    data={records}
    columns={[
      "id",
      "region",
      "cost",
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("shipping"),
      locked: true
    }, {
      columnName: "region",
      displayName: <FormattedMessage id="field.region" defaultMessage='Region'/>,
    }, {
      columnName: "cost",
      displayName: <FormattedMessage id="field.cost" defaultMessage='Cost'/>,
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Shippings = ({ shippings, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active={true}>
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/shipping">
            <Fa name='truck'/> <FormattedMessage id="inventory.shippings" defaultMessage='Shippings'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/shipping" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.shipping.add" defaultMessage='Add Shipping'/>
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
        {fetching ? <Loading/> : <ShippingsGrid records={shippings}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Shippings
