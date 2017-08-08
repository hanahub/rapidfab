import React, { PropTypes } from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Grid, {
  IdColumn,
  CapitalizeColumn,
} from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';


const ConversionsGrid = ({ records }) => (
  <Grid
    data={records}
    columns={[
      'id',
      'currency',
      'value',
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
      columnName: 'id',
      customComponent: IdColumn('conversion'),
      locked: true,
    }, {
      columnName: 'name',
      displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
    }, {
      columnName: 'region',
      customComponent: CapitalizeColumn,
      displayName: <FormattedMessage id="field.region" defaultMessage="Region" />,
    }, {
      columnName: 'value',
      displayName: <FormattedMessage id="field.multiplier" defaultMessage="Multiplier" />,
    }]}
  />
);

const Loading = () => (
  <div style={{ textAlign: 'center' }}>
    <Fa name="spinner" spin size="2x" />
  </div>
);

const Conversions = ({ conversions, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active>
            <Fa name="list" /> <FormattedMessage id="inventory" defaultMessage="Inventory" />
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/conversions">
            <Fa name="exchange" /> <FormattedMessage id="inventory.currencies" defaultMessage="Currencies" />
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/conversion" className="pull-right">
          <Fa name="plus" /> <FormattedMessage id="record.currency.add" defaultMessage="Add Currency" />
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr />

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors} />
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading /> : <ConversionsGrid records={conversions} />}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Conversions;
