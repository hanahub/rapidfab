import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';
import Grid, {
  IdColumn,
  BooleanColumn,
  CapitalizeColumn,
  ColorColumn,
} from 'rapidfab/components/grid';

const MaterialsGrid = ({ materials, manufacturers }) => (
  <Grid
    data={materials}
    columns={[
      'id',
      'name',
      'type',
      'color',
      'manufacturer',
      'third_party_fulfillment',
    ]}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('material'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        columnName: 'type',
        customComponent: CapitalizeColumn,
        displayName: <FormattedMessage id="field.type" defaultMessage="Type" />,
      },
      {
        columnName: 'manufacturer',
        customComponent: IdColumn(
          'manufacturer',
          'manufacturer',
          manufacturers,
          'name'
        ),
        displayName: (
          <FormattedMessage
            id="field.manufacturer"
            defaultMessage="Manufacturer"
          />
        ),
      },
      {
        columnName: 'color',
        customComponent: ColorColumn,
        displayName: (
          <FormattedMessage id="field.color" defaultMessage="Color" />
        ),
      },
      {
        columnName: 'third_party_fulfillment',
        customComponent: BooleanColumn,
        displayName: (
          <FormattedMessage
            id="field.thirdParty"
            defaultMessage="Third Party"
          />
        ),
      },
    ]}
  />
);

MaterialsGrid.propTypes = {
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Materials = ({ materials, manufacturers, fetching }) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['materials']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/material"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.material.add"
            defaultMessage="Add Material"
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
          <MaterialsGrid materials={materials} manufacturers={manufacturers} />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

Materials.propTypes = {
  fetching: PropTypes.bool.isRequired,
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Materials;
