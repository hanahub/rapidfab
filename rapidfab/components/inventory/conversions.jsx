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

const Conversions = ({ conversions, fetching }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['currencies']} />

    <Row>
      <Col xs={12}>
        <Button
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
            data={conversions}
            pageProperties={{ pageSize: 50 }}
            plugins={[plugins.LocalPlugin]}
            styleConfig={griddleStyleConfig}
          >
            <RowDefinition>
              <ColumnDefinition
                id="id"
                customComponent={props => (
                  <IdColumn {...props} resource={'conversion'} />
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
                id="currency"
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.name"
                    defaultMessage="Name"
                  />
                )}
              />
              <ColumnDefinition
                id="value"
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.multiplier"
                    defaultMessage="Multiplier"
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

Conversions.propTypes = {
  conversions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default Conversions;
