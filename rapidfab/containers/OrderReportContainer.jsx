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

    this.handleChange = this.handleChange.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleHide() {
    this.setState({ end: '', show: false, start: '' });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { end, start, show } = this.state;
    return (
      <OrderReport
        end={end}
        handleChange={this.handleChange}
        handleHide={this.handleHide}
        handleShow={this.handleShow}
        reportUrl={generateUrl(start, end)}
        show={show}
        start={start}
      />
    );
  }
}

export default OrderReportContainer;
