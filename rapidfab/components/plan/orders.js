import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage }                   from 'react-intl';
import Grid, {
  IdColumn,
  NumberColumn,
  ImageColumn,
  CapitalizeColumn,
  DateColumn,
  BooleanColumn,
  VolumeColumn
} from 'rapidfab/components/grid';


const Orders = ({ orders, materials }) => (
  <BS.Grid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item>
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
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/order/new" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.order.add" defaultMessage='Add Order'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <Grid
          data={orders}
          columns={[
            "id",
            "name",
            "quantity",
            "created"
          ]}
          columnMeta={[{
            displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
            columnName: "id",
            customComponent: IdColumn("order"),
            locked: true
          }, {
            customComponent: ImageColumn,
            columnName: "snapshot",
            displayName: <FormattedMessage id="field.preview" defaultMessage='Preview'/>
          }, {
            columnName: "name",
            displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>
          }, {
            customComponent: NumberColumn,
            columnName: "quantity",
            displayName: <FormattedMessage id="field.quantity" defaultMessage='Quantity'/>
          }, {
            customComponent: DateColumn,
            columnName: "created",
            displayName: <FormattedMessage id="field.created" defaultMessage='Created'/>
          }]}
        />
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Orders
