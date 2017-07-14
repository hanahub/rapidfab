import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Form, Panel } from 'react-bootstrap';

import EditOrderForm from './EditOrderForm';
import OrderRuns from './OrderRuns';
import SaveDropdownButton from './SaveDropdownButton';

const PanelHeader = () => (
  <FormattedMessage id="record.order.summary" defaultMessage="Order Summary"/>
);

class OrderSummary extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // redux-form v5 requires refs for remote form submission
    // this should be refactored out, either with redux-form v6 or with no redux-form
    this.refs.orderForm.submit();
  }

  onDelete() {
    dispatch(Actions.Api.wyatt.order.delete(this.uuid))
      .then( () => window.location.hash = "#/plan/orders" )
  }

  render() {
    const { onSubmit, onDelete } = this;
    return (
      <Panel header={<PanelHeader />}>

        <Form horizontal onSubmit={onSubmit}>

          <SaveDropdownButton onDelete={onDelete} />
          <hr />

          <Col xs={12} md={7}>
            <EditOrderForm ref="orderForm"/>
          </Col>

          <Col xs={12} md={5}>
            <OrderRuns />
          </Col>

        </Form>

      </Panel>
    );
  }
}

const mapStateToProps = state => ({ uuid: state.routeUUID.uuid });

export default connect(mapStateToProps)(OrderSummary)
