import React from 'react';
import PropTypes from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import AddLineItem from './AddLineItem';
import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import LineItem from './LineItem';
import OrderSummary from './OrderSummary';

const LineItems = ({ lineItems = [] }) => (
  <div>
    { lineItems.map(lineItem => {
        return (
          <LineItem
            key={lineItem}
            formKey={lineItem}
            uri={lineItem}
          />
        );
      })
    }
  </div>
);

const EditOrder = ({ order = {} }) => {
  const breadcrumbs = ["orders", order.id]
  const lineItems = order['line_items'];
  return(
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs}/>
      <OrderSummary />
      <LineItems lineItems={lineItems} />
      <AddLineItem />
    </Grid>
  );
}

const mapStateToProps = state => (
  { order: state.resources[state.routeUUID.uuid] }
);

export default connect(mapStateToProps)(EditOrder);
