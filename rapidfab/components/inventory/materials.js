import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { FormattedMessage }   from 'react-intl';
import Grid, {
  IdColumn,
  BooleanColumn,
  CapitalizeColumn,
  ColorColumn
} from 'rapidfab/components/grid';


const MaterialsGrid = ({ materials, manufacturers }) => (
  <Grid
    data={materials}
    columns={[
      'id',
      'name',
      'type',
      'color',
      'manufacturer',
      'third_party_fulfillment'
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("material"),
      locked: true
    }, {
      columnName: "name",
      displayName: <FormattedMessage id='field.name' defaultMessage="Name"/>
    }, {
      columnName: "type",
      customComponent: CapitalizeColumn,
      displayName: <FormattedMessage id='field.type' defaultMessage="Type"/>
    }, {
      columnName: "manufacturer",
      customComponent: IdColumn("manufacturer", "manufacturer", manufacturers),
      displayName: <FormattedMessage id='field.manufacturer' defaultMessage="Manufacturer"/>
    }, {
      columnName: "color",
      customComponent: ColorColumn,
      displayName: <FormattedMessage id='field.color' defaultMessage="Color"/>
    }, {
      columnName: "third_party_fulfillment",
      customComponent: BooleanColumn,
      displayName: <FormattedMessage id='field.thirdParty' defaultMessage="Third Party"/>
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Materials = ({ materials, manufacturers, fetching, errors }) => (
  <BS.Grid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/inventory">
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/material">
            <Fa name='object-group'/> <FormattedMessage id="inventory.materials" defaultMessage='Materials'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/material" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.material.add" defaultMessage='Add Material'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <MaterialsGrid materials={materials} manufacturers={manufacturers}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Materials
