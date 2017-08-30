import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';
import Loading from 'rapidfab/components/Loading';

const PostProcessorTypesGrid = ({ postProcessorTypes, manufacturers }) =>
  <Grid
    data={postProcessorTypes}
    columns={['id', 'name', 'manufacturer']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('post-processor-type'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        columnName: 'description',
        displayName: (
          <FormattedMessage
            id="field.description"
            defaultMessage="Description"
          />
        ),
      },
      {
        columnName: 'manufacturer',
        customComponent: IdColumn(
          'manufacturer',
          'manufacturer',
          manufacturers,
          'name'
        ),
        displayName: (
          <FormattedMessage
            id="field.manufacturer"
            defaultMessage="Manufacturer"
          />
        ),
      },
    ]}
  />;

const PostProcessorTypes = ({
  postProcessorTypes,
  fetching,
  apiErrors,
  manufacturers,
  materials,
}) =>
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['postProcessorTypes']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
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
        {fetching
          ? <Loading />
          : <PostProcessorTypesGrid
              postProcessorTypes={postProcessorTypes}
              manufacturers={manufacturers}
              materials={materials}
            />}
      </BS.Col>
    </BS.Row>
  </BS.Grid>;

export default PostProcessorTypes;
