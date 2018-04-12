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
    <Button bsStyle="success" bsSize="small" onClick={handleShow}>
      <FormattedMessage
        id="downloadCSVOrderReport"
        defaultMessage="Download CSV Order Report "
      />
    </Button>
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <FormattedMessage
          id="CSVOrderReport"
          defaultMessage="CSV Order Report"
        />
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <ControlLabel>
            <FormattedMessage id="startDate" defaultMessage="Start Date" />
            {` `}
            (<FormattedMessage id="optional" defaultMessage="Optional" />)
          </ControlLabel>
          <FormControl
            name="start"
            onChange={handleChange}
            pattern="^\d{4}-\d{2}-\d{2}$"
            placeholder="yyyy-mm-dd"
            type="date"
            value={start}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            <FormattedMessage id="endDate" defaultMessage="End Date" />
            {` `}
            (<FormattedMessage id="optional" defaultMessage="Optional" />)
          </ControlLabel>
          <FormControl
            name="end"
            onChange={handleChange}
            pattern="^\d{4}-\d{2}-\d{2}$"
            placeholder="yyyy-mm-dd"
            type="date"
            value={end}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="success" href={reportUrl}>
          <FormattedMessage id="button.download" defaultMessage="Download" />
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
