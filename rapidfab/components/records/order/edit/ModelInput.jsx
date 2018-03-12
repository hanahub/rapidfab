import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ControlLabel, FormControl, FormGroup, Label } from 'react-bootstrap';

const ModelInput = ({ handleFileChange, name }) => (
  <FormGroup>
    <ControlLabel htmlFor="modelInput" className="btn btn-default">
      <FormattedMessage
        id="chooseModelFile"
        defaultMessage="Choose Model File"
      />
    </ControlLabel>
    <Label bsStyle="success" style={{ marginLeft: '1rem' }}>
      {name}
    </Label>
    <FormControl
      id="modelInput"
      name="model"
      type="file"
      accept=".stl"
      required
      onChange={handleFileChange}
      style={{ opacity: '0' }}
    />
  </FormGroup>
);

ModelInput.defaultProps = { name: '' };

ModelInput.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default ModelInput;
