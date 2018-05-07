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
import ContactColumn from 'rapidfab/components/griddle/ContactColumn';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';

const LocationsGrid = ({ locations, users }) => (
  <Griddle
    components={{ Layout: GriddleLayout }}
    data={locations}
    pageProperties={{ pageSize: 50 }}
    plugins={[plugins.LocalPlugin]}
    styleConfig={griddleStyleConfig}
  >
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={props => <IdColumn {...props} resource={'location'} />}
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
      <ColumnDefinition
        id="contact"
        customComponent={props => <ContactColumn {...props} users={users} />}
        customHeadingComponent={props => (
          <CustomHeadingComponent
            {...props}
            id="field.contact"
            defaultMessage="Contact"
          />
        )}
      />
      <ColumnDefinition
        id="phone"
        customHeadingComponent={() => (
          <FormattedMessage id="field.phone" defaultMessage="Phone" />
        )}
      />
    </RowDefinition>
  </Griddle>
);

LocationsGrid.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Locations = ({ locations, users, fetching }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <BreadcrumbNav breadcrumbs={['locations']} />

        <div className="clearfix">
          <Button
            bsStyle="primary"
            bsSize="small"
            href="#/records/location"
            className="pull-right"
          >
            <Fa name="plus" />{' '}
            <FormattedMessage
              id="record.location.add"
              defaultMessage="Add Location"
            />
          </Button>
        </div>

        <hr />

        <FlashMessages />

        {fetching ? (
          <Loading />
        ) : (
          <LocationsGrid locations={locations} users={users} />
        )}
      </Col>
    </Row>
  </Grid>
);

Locations.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.shape({}).isRequired,
};

export default Locations;
