import React from 'react';
import PropTypes from 'react';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import OrderSummary from './OrderSummary';
import LineItem from './LineItem';

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
