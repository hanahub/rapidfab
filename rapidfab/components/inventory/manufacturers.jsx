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
import CustomHeadingComponent from 'rapidfab/components/griddle/CustomHeadingComponent';
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';

const ManufacturersGrid = ({ records }) => (
  <Griddle
    components={{ Layout: GriddleLayout }}
    data={records}
    plugins={[plugins.LocalPlugin]}
    styleConfig={griddleStyleConfig}
  >
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={props => (
          <IdColumn {...props} resource={'manufacturer'} />
        )}
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
        id="address"
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.address"
            defaultMessage="Address"
          />
        )}
      />
    </RowDefinition>
  </Griddle>
);

ManufacturersGrid.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Manufacturers = ({ manufacturers, fetching }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['manufacturers']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/manufacturer"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.manufacturer.add"
            defaultMessage="Add Manufacturer"
          />
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>
        {fetching ? <Loading /> : <ManufacturersGrid records={manufacturers} />}
      </Col>
    </Row>
  </Grid>
);

Manufacturers.propTypes = {
  fetching: PropTypes.bool.isRequired,
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Manufacturers;
