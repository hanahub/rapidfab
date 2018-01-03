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

import LineItem from './LineItem';

const AddLineItemButton = ({ onAddLineItem }) => (
  <div className="clearfix">
    <Button bsSize="small" onClick={() => onAddLineItem()}>
      Add Line Item
    </Button>
  </div>
);

AddLineItemButton.propTypes = {
  onAddLineItem: PropTypes.func.isRequired,
};

const NewOrderComponent = ({
  bannerMessage,
  bannerLink,
  handleDeleteLineItem,
  handleLineItemModelChange,
  handleLineItemChange,
  isUserRestricted,
  lineItems,
  onAddLineItem,
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
            <Button
              disabled={submitting}
              type="submit"
              value="submit"
              bsStyle="success"
              bsSize="small"
            >
              {submitting ? <Loading /> : <SaveButtonTitle />}
            </Button>
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

        <Panel header="Line Items">
          {lineItems.map((lineItem, index) => (
            <LineItem
              key={lineItem.uri}
              handleDeleteLineItem={handleDeleteLineItem}
              handleLineItemModelChange={handleLineItemModelChange}
              handleLineItemChange={handleLineItemChange}
              index={index}
              lineItem={lineItem}
            />
          ))}

          <hr />

          <Button bsSize="small" onClick={() => onAddLineItem()}>
            Add Line Item
          </Button>
        </Panel>
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
  handleDeleteLineItem: PropTypes.func.isRequired,
  handleLineItemModelChange: PropTypes.func.isRequired,
  handleLineItemChange: PropTypes.func.isRequired,
  isUserRestricted: PropTypes.bool.isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddLineItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineItems: [],
    };

    this.handleDeleteLineItem = this.handleDeleteLineItem.bind(this);
    this.handleLineItemModelChange = this.handleLineItemModelChange.bind(this);
    this.handleLineItemChange = this.handleLineItemChange.bind(this);
    this.onAddLineItem = this.onAddLineItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { bureau, dispatch, orderForm } = this.props;

    const { lineItems } = this.state;

    const modelPosts = lineItems.map(lineItem => {
      const modelName = lineItem.itar ? 'na' : lineItem.model.name;
      return dispatch(
        Actions.Api.hoth.model.post({ name: modelName, type: 'stl' })
      );
    });
    Promise.all(modelPosts).then(responses => {
      const modelLocations = responses.map(response => {
        const { location, uploadLocation } = response.headers;
        return { location, uploadLocation };
      });
      const updatedLineItems = lineItems.map((lineItem, index) =>
        Object.assign(
          {},
          lineItem,
          { modelLocation: modelLocations[index].location },
          { uploadLocation: modelLocations[index].uploadLocation }
        )
      );

      updatedLineItems.forEach(lineItem => {
        const { model, uploadLocation } = lineItem;
        dispatch(Actions.UploadModel.upload(uploadLocation, model));
      });

      // Prepare the payload
      const lineItemsPosts = updatedLineItems.map(lineItem => {
        const {
          baseMaterial,
          itar,
          modelLocation,
          supportMaterial,
          quantity,
          template,
          thirdPartyProvider,
        } = lineItem;
        const payload = {
          bureau: bureau.uri,
          itar,
          materials: {
            base: baseMaterial,
            support: supportMaterial,
          },
          model: modelLocation,
          quantity: parseInt(quantity, 10),
          template,
          third_party_provider: thirdPartyProvider,
        };

        if (itar) delete payload.model;
        if (!payload.materials.support) delete payload.materials.support;
        if (!payload.thirdPartyProvider) delete payload.thirdPartyProvider;

        return dispatch(Actions.Api.wyatt['line-item'].post(payload));
      });
      Promise.all(lineItemsPosts).then(lineItemResponses => {
        const lineItemUris = lineItemResponses.map(
          response => response.payload.uri
        );

        const orderPayload = {
          bureau: bureau.uri,
          channel_representative: orderForm.channel_representative.value,
          currency: orderForm.currency.value,
          due_date: orderForm.due_date.value
            ? new Date(orderForm.due_date.value).toISOString()
            : null,
          customer_email: orderForm.customer_email.value,
          customer_name: orderForm.customer_name.value,
          ip_sensitivity: orderForm.ip_sensitivity.value,
          line_items: lineItemUris,
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
      });
    });
  }

  onAddLineItem() {
    const { lineItems } = this.state;
    const { baseMaterials, supportMaterials, templates } = this.props;

    const initialBaseMaterial = baseMaterials[0] ? baseMaterials[0].uri : null;
    const initialSupportMaterial = supportMaterials[0]
      ? supportMaterials[0].uri
      : null;
    const initialTemplate = templates[0] ? templates[0].uri : null;

    const initialLineItemState = {
      baseMaterial: initialBaseMaterial,
      itar: false,
      supportMaterial: initialSupportMaterial,
      template: initialTemplate,
    };

    const updatedLineItems = [...lineItems, initialLineItemState];
    this.setState({ lineItems: updatedLineItems });
  }

  handleDeleteLineItem(deletedLineItemIndex) {
    const { lineItems } = this.state;

    const updatedLineItems = lineItems.filter(
      (lineItem, index) => index !== deletedLineItemIndex
    );

    this.setState({ lineItems: updatedLineItems });
  }

  handleLineItemModelChange(lineItemChange) {
    const { lineItems } = this.state;
    const { updatedLineItemIndex, model } = lineItemChange;

    const updatedLineItems = lineItems.map((lineItem, index) => {
      if (index === updatedLineItemIndex) {
        return Object.assign({}, lineItem, { model });
      }
      return lineItem;
    });

    this.setState({ lineItems: updatedLineItems });
  }

  handleLineItemChange(lineItemChange) {
    const { lineItems } = this.state;
    const { updatedLineItemIndex, name } = lineItemChange;
    const value = lineItemChange.value === 'none' ? null : lineItemChange.value;

    const updatedLineItems = lineItems.map((lineItem, index) => {
      if (index === updatedLineItemIndex) {
        return Object.assign({}, lineItem, { [name]: value });
      }
      return lineItem;
    });

    this.setState({ lineItems: updatedLineItems });
  }

  render() {
    const {
      handleDeleteLineItem,
      handleLineItemModelChange,
      handleLineItemChange,
      onAddLineItem,
      onSubmit,
    } = this;
    const { lineItems } = this.state;

    return (
      <NewOrderComponent
        {...this.props}
        handleDeleteLineItem={handleDeleteLineItem}
        handleLineItemModelChange={handleLineItemModelChange}
        handleLineItemChange={handleLineItemChange}
        lineItems={lineItems}
        onAddLineItem={onAddLineItem}
        onSubmit={onSubmit}
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
  const materials = Selectors.getMaterials(state);
  const baseMaterials = materials.filter(material => material.type === 'base');
  const submitting =
    state.ui.hoth.model.post.fetching ||
    state.ui.wyatt['line-item'].post.fetching ||
    state.ui.wyatt.order.post.fetching;
  const supportMaterials = materials.filter(
    material => material.type === 'success'
  );
  const templates = Selectors.getTemplates(state);

  return {
    baseMaterials,
    bureau,
    isUserRestricted,
    orderForm,
    submitting,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(NewOrder);
