import React, { Component } from 'react';
import CONFIG from 'rapidfab/config';
import OrderReport from '../components/OrderReport';

const queryParams = (start, end) => `?start=${start}&end=${end}`;

class OrderReportContainer extends Component {
  constructor(props) {
    super(props);

    this.start = '';
    this.end = '';
  }

  render() {
    const reportUrl = `${CONFIG.HOST.NAUTILUS}/order-report/${queryParams(
      this.start,
      this.end
    )}`;
    return <OrderReport reportUrl={reportUrl} />;
  }
}

export default OrderReportContainer;
