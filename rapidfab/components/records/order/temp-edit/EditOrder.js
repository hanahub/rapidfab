import React from 'react';
import PropTypes from 'react';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import OrderSummary from './OrderSummary';
import LineItem from './LineItem';
import AddLineItem from './AddLineItem';

const EditOrder = ({ orderResource }) => {
  const breadcrumbs = ["orders", orderResource.id]
  return(
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs}/>
      <OrderSummary />
      <LineItem />
      <AddLineItem />
    </Grid>
  );
}

export default EditOrder
