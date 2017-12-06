import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';

const ThirdPartyProvidersGrid = ({ providers }) => (
  <Grid
    data={providers}
    columns={['id', 'name', 'description']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('third-party-provider'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        columnName: 'description',
        displayName: (
          <FormattedMessage
            id="field.description"
            defaultMessage="Description"
          />
        ),
      },
    ]}
  />
);

ThirdPartyProvidersGrid.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ThirdPartyProviders = ({ providers, fetching }) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['thirdPartyProviders']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/third-party-provider"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.thirdPartyProvider.add"
            defaultMessage="Add Third Party Provider"
          />
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr />

    <FlashMessages />

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <ThirdPartyProvidersGrid providers={providers} />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

ThirdPartyProviders.propTypes = {
  fetching: PropTypes.bool.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThirdPartyProviders;
