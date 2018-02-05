import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const ModelInput = ({ handleFileChange }) => (
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
);

ModelInput.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
};

export default ModelInput;
