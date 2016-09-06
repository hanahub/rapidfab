import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { extractUuid }        from 'rapidfab/reducers/makeApiReducers'
import { FormattedMessage }   from 'react-intl';
import Grid, { IdColumn }     from 'rapidfab/components/grid';

const PostProcessorTypesGrid = ({ postProcessorTypes, manufacturers, materials }) => (
  <Grid
    data={postProcessorTypes}
    columns={[
      "id",
      "name",
      "manufacturer",
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("post-processor-type"),
      locked: true
    }, {
      columnName: "name",
      displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>
    }, {
      columnName: "description",
      displayName: <FormattedMessage id="field.description" defaultMessage='Description'/>
    }, {
      columnName: "manufacturer",
      customComponent: IdColumn("manufacturer", "manufacturer", manufacturers),
      displayName: <FormattedMessage id='field.manufacturer' defaultMessage="Manufacturer"/>
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const PostProcessorTypes = ({ postProcessorTypes, fetching, errors, manufacturers, materials }) => (
  <BS.Grid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item>
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/post-processer-types">
            <Fa name='object-group'/> <FormattedMessage id="inventory.postProcessorTypes" defaultMessage='Post Processor Types'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/post-processor-type" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.postProcessorType.add" defaultMessage='Add Post Processor Type'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <PostProcessorTypesGrid postProcessorTypes={postProcessorTypes} manufacturers={manufacturers} materials={materials}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default PostProcessorTypes
