import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage }                   from 'react-intl';
import Grid, {
  ImageColumn,
  CapitalizeColumn,
  DateColumn,
  BooleanColumn,
  VolumeColumn
} from 'rapidfab/components/grid';


const IdColumn = ({ data, rowData }) => (
  <a href={`#/records/order/${encodeURIComponent(rowData.uuid)}`}>
    {data}
  </a>
)

const Orders = ({ records }) => (
  <BS.Grid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/plan">
            <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/orders">
            <Fa name='files-o'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/order" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.order.add" defaultMessage='Add Order'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <Grid
          data={records}
          columns={[
            "id",
            "snapshot",
            "material",
            "estimatedShippingDate",
            "estimatedMaterialUsed",
            "estimatedSupportUsed",
            "useOriginalModel"
          ]}
          columnMeta={[{
            displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
            columnName: "id",
            customComponent: IdColumn,
            locked: true
          }, {
            customComponent: ImageColumn,
            columnName: "snapshot",
            displayName: <FormattedMessage id="field.preview" defaultMessage='Preview'/>
          }, {
            customComponent: CapitalizeColumn,
            columnName: "material",
            displayName: <FormattedMessage id="field.material" defaultMessage='Material'/>
          }, {
            customComponent: DateColumn,
            columnName: "estimatedShippingDate",
            displayName: <FormattedMessage id="field.estimatedShippingDate" defaultMessage='Estimated Shipping Date'/>
          }, {
            customComponent: VolumeColumn,
            columnName: "estimatedMaterialUsed",
            displayName: <FormattedMessage id="field.estimatedMaterialUsed" defaultMessage='Estimated Material Used'/>
          }, {
            customComponent: VolumeColumn,
            columnName: "estimatedSupportUsed",
            displayName: <FormattedMessage id="field.estimatedSupportUsed" defaultMessage='Estimated Support Used'/>
          }, {
            customComponent: VolumeColumn,
            columnName: "estimatedPrintTime",
            displayName: <FormattedMessage id="field.estimatedPrintTime" defaultMessage='Estimated Print Time'/>
          }, {
            customComponent: BooleanColumn,
            columnName: "useOriginalModel",
            displayName: <FormattedMessage id="field.useOriginalModel" defaultMessage='Use Original Model'/>
          }]}
        />
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Orders
