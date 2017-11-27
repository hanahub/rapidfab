import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Form, Grid, Panel } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

import NewOrderForm from './NewOrderForm';
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

const HelpLink = () => (
  <div className="pull-right">
    <a href="https://authentise.com/orderuploadhelp">
      <FormattedMessage id="help.link" defaultMessage="Help" />{' '}
      <Fa name="question-circle" />
    </a>
  </div>
);

const SaveButton = () => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <Button type="submit" value="submit" bsStyle="success" bsSize="small">
        <SaveButtonTitle />
      </Button>
    </div>
  </ButtonToolbar>
);

const LineItems = ({
  handleDeleteLineItem,
  handleLineItemModelChange,
  handleLineItemChange,
  lineItems,
}) => (
  <div>
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
  </div>
);

LineItems.propTypes = {
  handleDeleteLineItem: PropTypes.func.isRequired,
  handleLineItemModelChange: PropTypes.func.isRequired,
  handleLineItemChange: PropTypes.func.isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const NewOrderComponent = ({
  handleDeleteLineItem,
  handleLineItemModelChange,
  handleLineItemChange,
  lineItems,
  onAddLineItem,
  onSubmit,
}) => {
  const breadcrumbs = ['orders', 'New Order'];
  return (
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={breadcrumbs} />

      <Form horizontal onSubmit={onSubmit}>
        <SaveButton />
        <HelpLink />
        <hr />

        <Panel header="Order">
          <NewOrderForm />
        </Panel>

        <Panel header="Line Items">
          <LineItems
            handleDeleteLineItem={handleDeleteLineItem}
            handleLineItemModelChange={handleLineItemModelChange}
            handleLineItemChange={handleLineItemChange}
            lineItems={lineItems}
          />
          <hr />
          <AddLineItemButton onAddLineItem={onAddLineItem} />
        </Panel>
      </Form>
    </Grid>
  );
};

NewOrderComponent.propTypes = {
  handleDeleteLineItem: PropTypes.func.isRequired,
  handleLineItemModelChange: PropTypes.func.isRequired,
  handleLineItemChange: PropTypes.func.isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddLineItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  bureau: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  orderForm: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => {
  const bureau = Selectors.getBureau(state);
  const orderForm = state.form['record.order'];
  const materials = Selectors.getMaterials(state);
  const baseMaterials = materials.filter(material => material.type === 'base');
  const supportMaterials = materials.filter(
    material => material.type === 'success'
  );
  const templates = Selectors.getTemplates(state);

  return {
    baseMaterials,
    bureau,
    orderForm,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(NewOrder);
