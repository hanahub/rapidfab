import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Form, Panel } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import Feature from 'rapidfab/components/Feature';

import EditOrderFormContainer from 'rapidfab/containers/records/order/EditOrderFormContainer';
import OrderDocuments from './OrderDocuments';
import OrderEstimates from './OrderEstimates';
import OrderRuns from './OrderRuns';
import SaveDropdownButton from './SaveDropdownButton';

const PanelHeader = () => (
  <FormattedMessage id="record.order.summary" defaultMessage="Order Summary" />
);

const scrollToBottom = () => {
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
};

class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCancel() {
    const payload = { status: 'cancelled' };
    this.props.dispatch(Actions.Api.wyatt.order.put(this.props.uuid, payload));
  }

  onDelete() {
    this.props
      .dispatch(Actions.Api.wyatt.order.delete(this.props.uuid))
      .then(() => {
        window.location.hash = '#/plan/orders';
      });
  }

  onSubmit(event) {
    event.preventDefault();
    // redux-form v5 requires refs for remote form submission
    // this should be refactored out, either with redux-form v6 or with no redux-form
    /* eslint-disable react/no-string-refs */
    this.refs.orderForm.submit();
    /* eslint-enable react/no-string-refs */
  }

  render() {
    const { onCancel, onDelete, onSubmit } = this;
    return (
      <Panel header={<PanelHeader />}>
        <Form horizontal onSubmit={onSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <SaveDropdownButton
              onCancel={onCancel}
              onDelete={onDelete}
              resourceName="Order"
            />
            <Button
              bsStyle="success"
              bsSize="small"
              style={{ marginRight: '1rem' }}
              onClick={scrollToBottom}
            >
              <FormattedMessage
                id="record.lineItem.add"
                defaultMessage="Add Line Item"
              />
            </Button>
          </div>
          <hr />

          <Col xs={12} md={7}>
            {/* eslint-disable react/no-string-refs */}
            <EditOrderFormContainer ref="orderForm" />
            {/* eslint-enable react/no-string-refs */}
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

OrderSummary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ uuid: state.routeUUID });

export default connect(mapStateToProps)(OrderSummary);
