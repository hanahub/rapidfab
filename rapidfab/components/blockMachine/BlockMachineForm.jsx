import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const BlockMachineForm = ({
  description,
  downtime,
  finish,
  handleSubmit,
  handleInputChange,
  start,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <FormGroup controlId="uxName">
        <ControlLabel>
          <FormattedMessage
            id="field.description"
            defaultMessage="Description"
          />
        </ControlLabel>
        <FormControl
          name="description"
          onChange={handleInputChange}
          required
          type="text"
          value={description}
        />
      </FormGroup>

      <FormGroup controlId="uxName">
        <ControlLabel>Start Time</ControlLabel>
        <FormControl
          name="start"
          onChange={handleInputChange}
          required
          type="datetime-local"
          value={start}
        />
      </FormGroup>

      <FormGroup controlId="uxName">
        <ControlLabel>End Time</ControlLabel>
        <FormControl
          name="finish"
          onChange={handleInputChange}
          required
          type="datetime-local"
          value={finish}
        />
      </FormGroup>

      <Button block type="submit" vertical>
        {downtime ? 'Update Downtime' : 'Create New Downtime'}
      </Button>
    </form>
  </div>
);

BlockMachineForm.defaultProps = {
  downtime: null,
};

BlockMachineForm.propTypes = {
  description: PropTypes.string.isRequired,
  downtime: PropTypes.string,
  finish: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
};

export default BlockMachineForm;
