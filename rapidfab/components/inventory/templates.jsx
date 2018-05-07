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

const TemplateGrid = ({ records }) => (
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
        customComponent={props => <IdColumn {...props} resource={'template'} />}
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
    </RowDefinition>
  </Griddle>
);

TemplateGrid.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Templates = ({ templates, fetching }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['templates']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/template"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.template.add"
            defaultMessage="Add Template"
          />
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>
        {fetching ? <Loading /> : <TemplateGrid records={templates} />}
      </Col>
    </Row>
  </Grid>
);

Templates.propTypes = {
  fetching: PropTypes.bool.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Templates;
