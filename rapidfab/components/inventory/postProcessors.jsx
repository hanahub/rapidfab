import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';

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

const Loading = () => (
  <div style={{ textAlign: 'center' }}>
    <Fa name="spinner" spin size="2x" />
  </div>
);

const PostProcessors = ({
  postProcessors,
  locations,
  postProcessorTypes,
  fetching,
  apiErrors,
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

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors} />
      </BS.Col>
    </BS.Row>

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

export default PostProcessors;
