import React from 'react';
import PropTypes from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import OrderSummary from './OrderSummary';
import LineItem from './LineItem';
import AddLineItem from './AddLineItem';

const LineItems = ({ lineItems }) => (
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

const EditOrder= ({ order }) => {
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


const mapStateToProps = state => ({order: state.resources[state.routeUUID.uuid]});

export default connect(mapStateToProps)(EditOrder)
