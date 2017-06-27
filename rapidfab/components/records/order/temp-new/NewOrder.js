import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  ButtonToolbar,
  Grid,
  Panel,
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

import NewOrderForm from './NewOrderForm';
import LineItem from './LineItem';

const AddLineItemButton = ({ onAddLineItem }) => (
  <div className="clearfix">
    <Button bsSize="small" onClick={() => onAddLineItem() }>
      Add Line Item
    </Button>
  </div>
);

const SaveButton = ({ onSubmit }) => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <Button
        type="submit"
        bsStyle="success"
        bsSize="small"
        onClick={onSubmit}
      >
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
    { lineItems.map( (lineItem, index) => (
        <LineItem
          key={index}
          handleDeleteLineItem={handleDeleteLineItem}
          handleLineItemModelChange={handleLineItemModelChange}
          handleLineItemChange={handleLineItemChange}
          index={index}
          lineItem={lineItem}
        />
      ))
    }
  </div>
)

const NewOrderComponent = ({
  handleDeleteLineItem,
  handleLineItemModelChange,
  handleLineItemChange,
  lineItems,
  onAddLineItem,
  onSubmit,
}) => {
  const breadcrumbs = ['orders', 'New Order'];
  return(
    <Grid fluid>

      <BreadcrumbNav breadcrumbs={breadcrumbs}/>

      <SaveButton onSubmit={onSubmit}/>
      <hr />

      <Panel header="Order">

        <NewOrderForm onSubmit={onSubmit}/>

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

    </Grid>
  );
}

class NewOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lineItems: [],
    };

    this.handleDeleteLineItem = this.handleDeleteLineItem.bind(this);
    this.handleLineItemModelChange = this.handleLineItemModelChange.bind(this);
    this.handleLineItemChange = this.handleLineItemChange.bind(this);
    this.onAddLineItem = this.onAddLineItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDeleteLineItem(deletedLineItemIndex) {
    const { lineItems } = this.state;

    const updatedLineItems = lineItems.filter( (lineItem, index) => {
      return index !== deletedLineItemIndex;
    });

    this.setState({ lineItems: updatedLineItems });
  }

  handleLineItemModelChange(lineItemChange) {
    const { lineItems } = this.state;
    const { updatedLineItemIndex, model } = lineItemChange;

    const updatedLineItems = lineItems.map( (lineItem, index) => {
      if (index === updatedLineItemIndex)
        return Object.assign({}, lineItem, { model: model} );
      return lineItem;
    });

    this.setState({ lineItems: updatedLineItems });
  }

  handleLineItemChange(lineItemChange) {
    const { lineItems } = this.state;
    const { updatedLineItemIndex, name, value } = lineItemChange;

    const updatedLineItems = lineItems.map( (lineItem, index) => {
      if (index === updatedLineItemIndex)
        return Object.assign({}, lineItem, {[name]: value});
      return lineItem;
    });

    this.setState({ lineItems: updatedLineItems });
  }

  onAddLineItem() {
    const { lineItems } = this.state;
    const updatedLineItems = [ ...lineItems, {}, ];

    this.setState({ lineItems: updatedLineItems });
  }


  onSubmit() {
    const { orderForm } = this.props;
    console.log(orderForm);
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

const mapStateToProps = (state) => {
  const orderForm = state.form['record.order'];
  return { orderForm };
}

export default connect(mapStateToProps)(NewOrder)
