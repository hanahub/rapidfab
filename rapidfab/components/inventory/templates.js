import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';

const TemplateGrid = ({ records }) => (
  <Grid
    data={records}
    columns={[
      'id',
      'name',
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
      columnName: 'id',
      customComponent: IdColumn('template'),
      locked: true,
    }, {
      columnName: 'name',
      displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
    },
    ]}
  />
);

const Loading = () => (
  <div style={{ textAlign: 'center' }}>
    <Fa name="spinner" spin size="2x" />
  </div>
);

const Templates = ({ templates, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active>
            <Fa name="list" /> <FormattedMessage id="inventory" defaultMessage="Inventory" />
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/templates">
            <Fa name="list-ol" /> <FormattedMessage id="record.template" defaultMessage="Templates" />
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/template" className="pull-right">
          <Fa name="plus" /> <FormattedMessage id="record.template.add" defaultMessage="Add Template" />
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
      <BS.Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
        {fetching ? <Loading /> : <TemplateGrid records={templates} />}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Templates;
