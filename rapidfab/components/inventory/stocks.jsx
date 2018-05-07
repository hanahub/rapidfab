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
import ResourceColumn from 'rapidfab/components/griddle/ResourceColumn';

const Stocks = ({ stocks, materials, locations, fetching }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['materialStocks']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/stock"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.materialStock.add"
            defaultMessage="Add Material Stock"
          />
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <Griddle
            components={{ Layout: GriddleLayout }}
            data={stocks}
            pageProperties={{ pageSize: 50 }}
            plugins={[plugins.LocalPlugin]}
            styleConfig={griddleStyleConfig}
          >
            <RowDefinition>
              <ColumnDefinition
                id="id"
                customComponent={props => (
                  <IdColumn {...props} resource="stock" />
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
                id="material"
                customComponent={props => (
                  <ResourceColumn
                    {...props}
                    resource="material"
                    resources={materials}
                  />
                )}
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.material"
                    defaultMessage="Material"
                  />
                )}
              />
              <ColumnDefinition
                id="location"
                customComponent={props => (
                  <ResourceColumn
                    {...props}
                    resource="location"
                    resources={locations}
                  />
                )}
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.location"
                    defaultMessage="Location"
                  />
                )}
              />
              <ColumnDefinition
                id="status"
                customComponent={CapitalizeColumn}
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.status"
                    defaultMessage="Status"
                  />
                )}
              />
              <ColumnDefinition
                id="quantity"
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.quantity"
                    defaultMessage="Quantity"
                  />
                )}
              />
            </RowDefinition>
          </Griddle>
        )}
      </Col>
    </Row>
  </Grid>
);

Stocks.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stocks;
