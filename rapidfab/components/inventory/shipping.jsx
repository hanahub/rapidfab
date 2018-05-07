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
import CapitalizeColumn from 'rapidfab/components/griddle/CapitalizeColumn';
import CustomHeadingComponent from 'rapidfab/components/griddle/CustomHeadingComponent';
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';

const ShippingsGrid = ({ records }) => (
  <Griddle
    components={{ Layout: GriddleLayout }}
    data={records}
    pageProperties={{ pageSize: 50 }}
    plugins={[plugins.LocalPlugin]}
    styleConfig={griddleStyleConfig}
  >
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={props => <IdColumn {...props} resource={'shipping'} />}
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
        id="region"
        customComponent={CapitalizeColumn}
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.region"
            defaultMessage="Region"
          />
        )}
      />
      <ColumnDefinition
        id="cost"
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.cost"
            defaultMessage="Cost"
          />
        )}
      />
    </RowDefinition>
  </Griddle>
);

ShippingsGrid.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Shippings = ({ shippings, fetching }) => (
  <Grid>
    <BreadcrumbNav breadcrumbs={['shipping']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/shipping"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.shipping.add"
            defaultMessage="Add Shipping"
          />
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>
        {fetching ? <Loading /> : <ShippingsGrid records={shippings} />}
      </Col>
    </Row>
  </Grid>
);

Shippings.propTypes = {
  fetching: PropTypes.bool.isRequired,
  shippings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Shippings;
