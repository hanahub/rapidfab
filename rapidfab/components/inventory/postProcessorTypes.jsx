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

const PostProcessorTypesGrid = ({ postProcessorTypes }) => (
  <Griddle
    components={{ Layout: GriddleLayout }}
    data={postProcessorTypes}
    plugins={[plugins.LocalPlugin]}
    styleConfig={griddleStyleConfig}
  >
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={props => (
          <IdColumn {...props} resource={'post-processor-type'} />
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
    </RowDefinition>
  </Griddle>
);

PostProcessorTypesGrid.propTypes = {
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const PostProcessorTypes = ({ postProcessorTypes, fetching, materials }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['postProcessorTypes']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/post-processor-type"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.postProcessorType.add"
            defaultMessage="Add Post Processor Type"
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
          <PostProcessorTypesGrid
            postProcessorTypes={postProcessorTypes}
            materials={materials}
          />
        )}
      </Col>
    </Row>
  </Grid>
);

PostProcessorTypes.propTypes = {
  fetching: PropTypes.bool.isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessorTypes;
