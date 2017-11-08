import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const BlockMachineForm = ({
  description,
  blockMachines,
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

      <Button type="submit">Block Machine</Button>
    </form>

    {blockMachines.map(block => (
      <p key={block.uri}>
        {block.description} - {block.start} - {block.finish}
      </p>
    ))}
  </div>
);

BlockMachineForm.propTypes = {
  description: PropTypes.string.isRequired,
  blockMachines: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      finish: PropTypes.string,
      start: PropTypes.string,
    })
  ).isRequired,
  finish: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
};

export default BlockMachineForm;
