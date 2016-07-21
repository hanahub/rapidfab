import React, { PropTypes }     from "react";
import _                                from "lodash";
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import Order                            from 'rapidfab/components/records/order'
import FakeData                         from 'rapidfab/fakeData';
import * as BS                          from 'react-bootstrap';


const OrderContainer = props => (
  <Order {...props}/>
)

function mapDispatchToProps(dispatch) {
  return {
    onSave: (uri, record) => {
      // TODO: Finish Save
      throw NotImplemented
    },
    onDelete: (uri, record) => {
      // TODO: Finish Delete
      throw NotImplemented
    }
  }
}

function mapStateToProps(state, props) {
  const {
    orders
  } = state;

  return {
    uuid: props.route.uuid,
    record: orders[props.route.uuid]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer)
