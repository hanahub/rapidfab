import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

const OrderReport = ({
  end,
  handleChange,
  handleHide,
  handleShow,
  reportUrl,
  show,
  start,
}) => (
  <div>
    <Button bsStyle="primary" bsSize="small" onClick={handleShow}>
      <FormattedMessage
        id="downloadOrderReport"
        defaultMessage="Download Order Report"
      />
    </Button>
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        Order Report
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <ControlLabel>Start Date</ControlLabel>
          <FormControl
            name="start"
            onChange={handleChange}
            placeholder="Start Date"
            type="date"
            value={start}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>End Date</ControlLabel>
          <FormControl
            name="end"
            onChange={handleChange}
            placeholder="Start Date"
            type="date"
            value={end}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="success" href={reportUrl}>
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);

OrderReport.propTypes = {
  end: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  reportUrl: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  start: PropTypes.string.isRequired,
};

export default OrderReport;
