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
import ResourceColumn from 'rapidfab/components/griddle/ResourceColumn';

const PostProcessors = ({
  fetching,
  locations,
  postProcessors,
  postProcessorTypes,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['postProcessors']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/post-processor"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.postProcessor.add"
            defaultMessage="Add Post Processor"
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
            data={postProcessors}
            plugins={[plugins.LocalPlugin]}
            styleConfig={griddleStyleConfig}
          >
            <RowDefinition>
              <ColumnDefinition
                id="id"
                customComponent={props => (
                  <IdColumn {...props} resource={'post-processor'} />
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
                id="duration"
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.duration"
                    defaultMessage="Duration"
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
                    defaultMessage="Duration"
                  />
                )}
              />
              <ColumnDefinition
                id="post_processor_type"
                customComponent={props => (
                  <ResourceColumn
                    {...props}
                    slug="post-processor-type"
                    resource="post_processor_type"
                    resources={postProcessorTypes}
                  />
                )}
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.postProcessorType"
                    defaultMessage="Post Processor Type"
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

PostProcessors.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessors: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessors;
