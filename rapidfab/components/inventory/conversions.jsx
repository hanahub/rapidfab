import React from 'react';
import PropTypes from 'prop-types';

import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Grid, { IdColumn, CapitalizeColumn } from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';

const Conversions = ({ conversions, fetching }) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['currencies']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/conversion"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.currency.add"
            defaultMessage="Add Currency"
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
          <Grid
            data={conversions}
            columns={['id', 'currency', 'value']}
            columnMeta={[
              {
                displayName: (
                  <FormattedMessage id="field.id" defaultMessage="Id" />
                ),
                columnName: 'id',
                customComponent: IdColumn('conversion'),
                locked: true,
              },
              {
                columnName: 'name',
                displayName: (
                  <FormattedMessage id="field.name" defaultMessage="Name" />
                ),
              },
              {
                columnName: 'region',
                customComponent: CapitalizeColumn,
                displayName: (
                  <FormattedMessage id="field.region" defaultMessage="Region" />
                ),
              },
              {
                columnName: 'value',
                displayName: (
                  <FormattedMessage
                    id="field.multiplier"
                    defaultMessage="Multiplier"
                  />
                ),
              },
            ]}
          />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

Conversions.propTypes = {
  conversions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default Conversions;
