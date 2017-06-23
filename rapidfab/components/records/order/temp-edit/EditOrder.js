import React from 'react';
import PropTypes from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import OrderSummary from './OrderSummary';
import LineItem from './LineItem';
import AddLineItem from './AddLineItem';

const EditOrder= ({ order }) => {
  const breadcrumbs = ["orders", order.id]
  return(
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs}/>
      <OrderSummary />
      <LineItem />
      <AddLineItem />
    </Grid>
  );
}


const mapStateToProps = state => ({order: state.resources[state.routeUUID.uuid]});

export default connect(mapStateToProps)(EditOrder)
