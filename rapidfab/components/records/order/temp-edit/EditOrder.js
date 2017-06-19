import React from 'react';
import PropTypes from 'react';
import { Grid } from 'react-bootstrap';

import OrderSummary from './OrderSummary';
import LineItem from './LineItem';
import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';

const EditOrder = ({ orderResource }) => {
  const breadcrumbs = ["orders", orderResource.id]
  return(
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs}/>
      <OrderSummary />
      <LineItem />
    </Grid>
  );
}

export default EditOrder
