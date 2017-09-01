import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, Form, Panel } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import Feature from 'rapidfab/components/Feature';

import EditOrderForm from './EditOrderForm';
import OrderDocuments from './OrderDocuments';
import OrderEstimates from './OrderEstimates';
import OrderRuns from './OrderRuns';
import SaveDropdownButton from './SaveDropdownButton';

const PanelHeader = () => (
  <FormattedMessage id="record.order.summary" defaultMessage="Order Summary" />
);

class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // redux-form v5 requires refs for remote form submission
    // this should be refactored out, either with redux-form v6 or with no redux-form
    this.refs.orderForm.submit();
  }

  onDelete() {
    this.props
      .dispatch(Actions.Api.wyatt.order.delete(this.props.uuid))
      .then(() => (window.location.hash = '#/plan/orders'));
  }

  render() {
    const { onSubmit, onDelete } = this;
    return (
      <Panel header={<PanelHeader />}>
        <Form horizontal onSubmit={onSubmit}>
          <SaveDropdownButton onDelete={onDelete} />
          <hr />

          <Col xs={12} md={7}>
            <EditOrderForm ref="orderForm" />
          </Col>

          <Col xs={12} md={5}>
            <OrderEstimates />
            <Feature featureName="order-documents">
              <OrderDocuments />
            </Feature>
            <OrderRuns />
          </Col>
        </Form>
      </Panel>
    );
  }
}

const mapStateToProps = state => ({ uuid: state.routeUUID });

export default connect(mapStateToProps)(OrderSummary);
