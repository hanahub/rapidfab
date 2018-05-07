import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Grid, Row } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import BooleanColumn from 'rapidfab/components/griddle/BooleanColumn';
import CapitalizeColumn from 'rapidfab/components/griddle/CapitalizeColumn';
import ColorColumn from 'rapidfab/components/griddle/ColorColumn';
import CustomHeadingComponent from 'rapidfab/components/griddle/CustomHeadingComponent';
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';

const MaterialsGrid = ({ materials }) => (
  <Griddle
    components={{ Layout: GriddleLayout }}
    data={materials}
    pageProperties={{ pageSize: 50 }}
    plugins={[plugins.LocalPlugin]}
    sortProperties={[{ id: 'name', sortAscending: true }]}
    styleConfig={griddleStyleConfig}
  >
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={props => <IdColumn {...props} resource={'material'} />}
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.id"
            defaultMessage="ID"
          />
        )}
      />
      <ColumnDefinition
        id="name"
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.name"
            defaultMessage="Name"
          />
        )}
      />
      <ColumnDefinition
        id="type"
        customComponent={CapitalizeColumn}
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.type"
            defaultMessage="Type"
          />
        )}
      />
      <ColumnDefinition
        id="color"
        customComponent={ColorColumn}
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.color"
            defaultMessage="Color"
          />
        )}
      />
      <ColumnDefinition
        id="third_party_fulfillment"
        customComponent={BooleanColumn}
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.thirdParty"
            defaultMessage="Third Party"
          />
        )}
      />
    </RowDefinition>
  </Griddle>
);

MaterialsGrid.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Materials = ({ materials, fetching }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['materials']} />

    <Row>
      <Col xs={12}>
        <Button
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
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>
        {fetching ? <Loading /> : <MaterialsGrid materials={materials} />}
      </Col>
    </Row>
  </Grid>
);

Materials.propTypes = {
  fetching: PropTypes.bool.isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Materials;
