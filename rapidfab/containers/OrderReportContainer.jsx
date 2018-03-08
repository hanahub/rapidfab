import React, { Component } from 'react';
import CONFIG from 'rapidfab/config';
import OrderReport from '../components/OrderReport';

const generateUrl = (start, end) =>
  `${CONFIG.HOST.NAUTILUS}/order-report/?start=${start}&end=${end}`;

class OrderReportContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      end: '',
      start: '',
      show: false,
    };

    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleHide() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { end, start, show } = this.state;
    return (
      <OrderReport
        handleHide={this.handleHide}
        handleShow={this.handleShow}
        reportUrl={generateUrl(start, end)}
        show={show}
      />
    );
  }
}

export default OrderReportContainer;
