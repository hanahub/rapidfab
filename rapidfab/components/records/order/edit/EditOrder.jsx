import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';

import AddLineItem from './AddLineItem';
import LineItem from './LineItem';
import OrderSummary from './OrderSummary';

const LineItems = ({ lineItems = [] }) => (
  <div>
    { lineItems.map(lineItem => (
      <LineItem
        key={lineItem}
        formKey={lineItem}
        uri={lineItem}
      />
    ))
    }
  </div>
);

const EditOrder = ({ order = {} }) => {
  const breadcrumbs = ['orders', order.id];
  const lineItems = order.line_items;
  return (
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
      <OrderSummary />
      <LineItems lineItems={lineItems} />
      <AddLineItem />
    </Grid>
  );
};

const mapStateToProps = state => (
  { order: state.resources[state.routeUUID] }
);

export default connect(mapStateToProps)(EditOrder);
