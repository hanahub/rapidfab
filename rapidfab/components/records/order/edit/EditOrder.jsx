import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';

import AddLineItem from './AddLineItem';
import LineItem from './LineItem';
import OrderSummary from './OrderSummary';

const LineItems = ({ lineItems }) => (
  <div>
    {lineItems.map(lineItem => (
      <LineItem key={lineItem} formKey={lineItem} uri={lineItem} />
    ))}
  </div>
);

LineItems.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const EditOrder = ({ order = {} }) => {
  const id = order.id ? order.id : '';
  const breadcrumbs = ['orders', id];
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

EditOrder.propTypes = {
  order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ order: state.resources[state.routeUUID] });

export default connect(mapStateToProps)(EditOrder);
