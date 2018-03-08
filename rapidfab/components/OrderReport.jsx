import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

const OrderReport = ({ handleHide, handleShow, reportUrl, show }) => (
  <div>
    <Button bsStyle="primary" bsSize="small" onClick={handleShow}>
      <FormattedMessage
        id="downloadOrderReport"
        defaultMessage="Download Order Report"
      />
    </Button>
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton />
      <Modal.Body />
      <Modal.Footer>
        <Button bsStyle="success" href={reportUrl}>
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);

OrderReport.propTypes = {
  handleHide: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  reportUrl: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default OrderReport;
