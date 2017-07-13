import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
  Button,
  Col,
  ListGroupItem,
  Row,
} from 'react-bootstrap';

import * as Selectors from 'rapidfab/selectors';

import {
  FormattedMessage,
  FormattedDate,
  FormattedTime,
} from 'rapidfab/i18n';

const ExpandedContent = ({event}) => (
<Row>
  <Col xs={1}/>
  <Col xs={8}>
    <span>{`${event.current_value}`}</span>
  </Col>
  <Col xs={3} className="text-right">
    <FormattedTime value={event.created}/>
    <br/>
    <span>{`${event.user}`}</span>
  </Col>
</Row>
);

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true }

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { toggleCollapsed } = this;
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={1}>
            <Button
              bsSize="xsmall"
              onClick={toggleCollapsed}
            >
              <FontAwesome name={ collapsed ? "chevron-right" : "chevron-down"} />
            </Button>
          </Col>
          <Col xs={8}>
            {` ${event.key}`}
          </Col>
          <Col xs={3} className="text-right">
            <FormattedDate value={event.created}/>
          </Col>
        </Row>
        { collapsed? null : <ExpandedContent event={event}/> }
      </ListGroupItem>
    );
  }
}

const mapStateToProps = (state) => {
  const lineItems = Selectors.getLineItems(state);
  const models = Selectors.getModels(state);
  const orders = Selectors.getOrders(state);
  const users = Selectors.getUsers(state);
  return {
    lineItems,
    models,
    orders,
    users,
  }
};

export default connect(mapStateToProps)(Event)
