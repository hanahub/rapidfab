import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import OrdersComponent                  from 'rapidfab/components/plan/orders'
import FakeData                         from 'rapidfab/fakeData';


const OrdersContainer = props => (
  <OrdersComponent {...props}/>
)

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  const {
  } = state;

  return {
    records: _.values(FakeData.orders)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)
