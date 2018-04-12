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
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';
import ResourceColumn from 'rapidfab/components/griddle/ResourceColumn';
import StatusColumn from 'rapidfab/components/griddle/StatusColumn';

const Printers = ({
  printers,
  locations,
  printerTypes,
  modelers,
  fetching,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/printer"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.printer.add"
            defaultMessage="Add Printer"
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
            data={printers}
            plugins={[plugins.LocalPlugin]}
            styleConfig={griddleStyleConfig}
          >
            <RowDefinition>
              <ColumnDefinition
                id="id"
                customComponent={props => (
                  <IdColumn {...props} resource="printer" />
                )}
                customHeadingComponent={() => (
                  <FormattedMessage id="field.id" defaultMessage="Id" />
                )}
              />
              <ColumnDefinition
                id="modeler"
                customComponent={props => (
                  <StatusColumn {...props} modelers={modelers} />
                )}
                customHeadingComponent={() => (
                  <FormattedMessage id="field.status" defaultMessage="Status" />
                )}
              />
              <ColumnDefinition
                id="name"
                customHeadingComponent={() => (
                  <FormattedMessage id="field.name" defaultMessage="Name" />
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
                customHeadingComponent={() => (
                  <FormattedMessage
                    id="field.location"
                    defaultMessage="Location"
                  />
                )}
              />
              <ColumnDefinition
                id="printer_type"
                customComponent={props => (
                  <ResourceColumn
                    {...props}
                    slug="printer-type"
                    resource="printer_type"
                    resources={printerTypes}
                  />
                )}
                customHeadingComponent={() => (
                  <FormattedMessage
                    id="field.printerType"
                    defaultMessage="Printer Type"
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

Printers.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Printers;
