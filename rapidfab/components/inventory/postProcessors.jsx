import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';

const PostProcessorsGrid = ({
  postProcessors,
  postProcessorTypes,
  locations,
}) => (
  <Grid
    data={postProcessors}
    columns={['id', 'name', 'duration', 'location', 'post_processor_type']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('post-processor'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        columnName: 'duration',
        displayName: (
          <FormattedMessage id="field.duration" defaultMessage="Duration" />
        ),
      },
      {
        columnName: 'post_processor_type',
        customComponent: IdColumn(
          'post-processor-type',
          'post_processor_type',
          postProcessorTypes,
          'name'
        ),
        displayName: (
          <FormattedMessage
            id="field.postProcessorType"
            defaultMessage="Post Processor Type"
          />
        ),
      },
      {
        columnName: 'location',
        customComponent: IdColumn('location', 'location', locations, 'name'),
        displayName: (
          <FormattedMessage id="field.location" defaultMessage="Location" />
        ),
      },
    ]}
  />
);

PostProcessorsGrid.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessors: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const PostProcessors = ({
  fetching,
  locations,
  postProcessors,
  postProcessorTypes,
}) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['postProcessors']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
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
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr />

    <FlashMessages />

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <PostProcessorsGrid
            postProcessors={postProcessors}
            locations={locations}
            postProcessorTypes={postProcessorTypes}
          />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

PostProcessors.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessors: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessors;
