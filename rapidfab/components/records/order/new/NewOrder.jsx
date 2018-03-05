import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  Alert,
  Button,
  ButtonToolbar,
  Form,
  Grid,
  Panel,
} from 'react-bootstrap';
import Fa from 'react-fontawesome';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Loading from 'rapidfab/components/Loading';
import NewOrderFormContainer from 'rapidfab/containers/records/order/NewOrderFormContainer';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const SaveOrderButton = ({ submitting }) => (
  <Button
    disabled={submitting}
    type="submit"
    value="submit"
    bsStyle="success"
    bsSize="small"
  >
    {submitting ? <Loading /> : <SaveButtonTitle resourceName="Order" />}
  </Button>
);

SaveOrderButton.propTypes = { submitting: PropTypes.bool.isRequired };

const NewOrderComponent = ({
  bannerMessage,
  bannerLink,
  isUserRestricted,
  onSubmit,
  submitting,
}) => {
  const breadcrumbs = ['orders', 'New Order'];
  return (
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs} />

      <Form horizontal onSubmit={onSubmit}>
        <ButtonToolbar className="clearfix">
          <div className="pull-right">
            <SaveOrderButton submitting={submitting} />
          </div>
        </ButtonToolbar>
        <div className="pull-right">
          <a href="https://authentise.com/orderuploadhelp">
            <FormattedMessage id="help.link" defaultMessage="Help" />{' '}
            <Fa name="question-circle" />
          </a>
        </div>
        <hr />

        {isUserRestricted &&
          bannerMessage && (
            <a href={bannerLink} target="_blank">
              <Alert>{bannerMessage}</Alert>
            </a>
          )}

        <Panel header="Order">
          <NewOrderFormContainer />
        </Panel>
        <ButtonToolbar className="clearfix" style={{ marginBottom: '3rem' }}>
          <div className="pull-right">
            <Button type="submit" bsStyle="success">
              Add Line Items
            </Button>
          </div>
        </ButtonToolbar>
      </Form>
    </Grid>
  );
};

NewOrderComponent.defaultProps = {
  bannerMessage: null,
  bannerLink: null,
};

NewOrderComponent.propTypes = {
  bannerMessage: PropTypes.string,
  bannerLink: PropTypes.string,
  isUserRestricted: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { bureau, dispatch, orderForm } = this.props;

    const orderPayload = {
      bureau: bureau.uri,
      business_segment: orderForm.business_segment.value,
      channel_representative: orderForm.channel_representative.value,
      currency: orderForm.currency.value,
      due_date: orderForm.due_date.value
        ? new Date(orderForm.due_date.value).toISOString()
        : null,
      customer_email: orderForm.customer_email.value,
      customer_name: orderForm.customer_name.value,
      ip_sensitivity: orderForm.ip_sensitivity.value,
      line_items: [],
      name: orderForm.name.value,
      notes: orderForm.notes.value,
      order_owner: orderForm.order_owner.value,
      order_type: orderForm.order_type.value,
      region: orderForm.region.value,
      sales_representative: orderForm.sales_representative.value,
      sales_status: orderForm.sales_status.value,
      shipping: {
        address: orderForm.shipping.address.value,
        name: orderForm.shipping.name.value,
        tracking: orderForm.shipping.tracking.value,
        uri: orderForm.shipping.uri.value,
      },
    };

    Object.keys(orderPayload).forEach(key => {
      if (orderPayload[key] == null || orderPayload[key] === 'none') {
        delete orderPayload[key];
      }
    });

    dispatch(Actions.Api.wyatt.order.post(orderPayload)).then(response => {
      const orderUuid = extractUuid(response.payload.uri);
      window.location = `/#/records/order/${orderUuid}`;
    });
  }

  render() {
    return (
      <NewOrderComponent
        {...this.props}
        bannerLink={this.props.bureau.order_banner.link}
        bannerMessage={this.props.bureau.order_banner.message}
        onSubmit={this.onSubmit}
      />
    );
  }
}

NewOrder.propTypes = {
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  bureau: PropTypes.shape({
    order_banner: PropTypes.shape({
      message: PropTypes.string,
      link: PropTypes.string,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  isUserRestricted: PropTypes.bool.isRequired,
  orderForm: PropTypes.shape({}).isRequired,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const bureau = Selectors.getBureau(state);
  const isUserRestricted = Selectors.isCurrentUserRestricted(state);
  const orderForm = state.form['record.order'];
  const submitting =
    state.ui.hoth.model.post.fetching || state.ui.wyatt.order.post.fetching;
  return {
    bureau,
    isUserRestricted,
    orderForm,
    submitting,
  };
};

export default connect(mapStateToProps)(NewOrder);
