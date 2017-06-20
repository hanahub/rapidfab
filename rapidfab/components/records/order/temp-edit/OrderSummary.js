import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import {
  ButtonToolbar,
  Col,
  MenuItem,
  Panel,
  SplitButton,
} from 'react-bootstrap';

import EditOrderForm from './EditOrderForm';
import OrderRuns from './OrderRuns';

const ActionToolbar = ({onSubmit, onDelete}) => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <SplitButton
        id="actions"
        type="submit"
        bsStyle="success"
        bsSize="small"
        title={<SaveButtonTitle />}
        onClick={onSubmit}
      >
        <MenuItem
          eventKey={1}
          onClick={onDelete}
        >
          <Fa name='ban'/>
          <FormattedMessage id="button.delete" defaultMessage='Delete'/>
        </MenuItem>
      </SplitButton>
    </div>
  </ButtonToolbar>
);

const SaveButtonTitle = () => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
);

class OrderSummary extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onSubmit.bind(this);
  }

  onSubmit() {
    // redux-form v5 requires refs for remote form submission
    // this should be refactored out, either with redux-form v6 or with no redux-form
    this.refs.orderForm.submit();
  }

  onDelete() {
    const { uuid } = this;

    dispatch(Actions.Api.wyatt.order.delete(uuid))
      .then( () => window.location.hash = "#/plan/orders" )
  }

  render() {
    const { onSubmit, onDelete } = this;
    return (
      <Panel header="Order Summary">

        <ActionToolbar onSubmit={onSubmit} onDelete={onDelete} />
        <hr />

        <Col xs={12} md={7}>
          <EditOrderForm ref="orderForm"/>
        </Col>

        <Col xs={12} md={5}>
          <OrderRuns />
        </Col>

      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return { uuid: state.routeUUID.uuid }
}

export default connect(mapStateToProps)(OrderSummary)
