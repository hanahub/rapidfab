import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

const ModelInput = ({ handleFileChange }) =>
  <Col lg={2}>
    <FormGroup>
      <ControlLabel>
        <FormattedMessage id="field.model" defaultMessage="Model" />:
      </ControlLabel>
      <FormControl
        name="model"
        type="file"
        accept=".stl"
        required
        onChange={handleFileChange}
      />
    </FormGroup>
  </Col>;

ModelInput.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
};

export default ModelInput;
