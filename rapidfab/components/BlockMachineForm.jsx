import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

import Loading from 'rapidfab/components/Loading';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const styles = {
  spacingTop: { marginTop: '1rem' },
};

const BlockMachineForm = ({
  description,
  end,
  handleSubmit,
  handleInputChange,
  start,
}) => (
  <form onSubmit={handleSubmit}>

    <FormGroup controlId="uxName">
      <ControlLabel>
        <FormattedMessage id="field.description" defaultMessage="Description" />
      </ControlLabel>
      <FormControl
        name="description"
        onChange={handleInputChange}
        required
        type="text"
        value={description}
      />
    </FormGroup>

    <Button type="submit" >
      Block Machine
    </Button>

  </form>
);


BlockMachineForm.propTypes = {
  description: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
};

export default BlockMachineForm;
