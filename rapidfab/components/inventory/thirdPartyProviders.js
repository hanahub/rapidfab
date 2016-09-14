import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { extractUuid }        from 'rapidfab/reducers/makeApiReducers'
import { FormattedMessage }   from 'react-intl';
import Grid, { IdColumn }     from 'rapidfab/components/grid';
import Error                  from 'rapidfab/components/error'

const ThirdPartyProvidersGrid = ({ providers }) => (
  <Grid
    data={providers}
    columns={[
      "id",
      "name",
      "description",
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("third-party-provider"),
      locked: true
    }, {
      columnName: "name",
      displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>
    }, {
      columnName: "description",
      displayName: <FormattedMessage id="field.description" defaultMessage='Description'/>
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const ThirdPartyProviders = ({ providers, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item>
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/third-party-providers">
            <Fa name='map-marker'/> <FormattedMessage id="inventory.third_party_providers" defaultMessage='Third Party Providers'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/third-party-provider" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.third_party_provider.add" defaultMessage='Add Third Party Provider'/>
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
        {fetching ? <Loading/> : <ThirdPartyProvidersGrid providers={providers}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default ThirdPartyProviders
