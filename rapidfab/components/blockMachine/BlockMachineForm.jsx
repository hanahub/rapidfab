import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Row,
} from 'react-bootstrap';

const BlockMachineForm = ({
  description,
  downtime,
  finishDate,
  finishTime,
  handleInputChange,
  handleSubmit,
  isStartValid,
  isFinishValid,
  initialValues,
  startDate,
  startTime,
}) => (
  <div>
    <h2>
      {downtime
        ? `Editing ${initialValues.description}`
        : 'Create New Downtime'}
    </h2>
    <Form onSubmit={handleSubmit}>
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

      <hr />
      <Row>
        <Col sm={12} md={6}>
          <FormGroup
            controlId="uxName"
            validationState={isStartValid ? null : 'error'}
          >
            <ControlLabel>Start Date</ControlLabel>
            <FormControl
              name="startDate"
              onChange={handleInputChange}
              required
              type="date"
              value={startDate}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6}>
          <FormGroup
            controlId="uxName"
            validationState={isStartValid ? null : 'error'}
          >
            <ControlLabel>Start Time</ControlLabel>
            <FormControl
              name="startTime"
              onChange={handleInputChange}
              required
              type="time"
              value={startTime}
            />
            {!isStartValid && (
              <HelpBlock>
                <FormattedMessage
                  id="validateStartTime"
                  defaultValue="Must begin in the future"
                />
              </HelpBlock>
            )}
          </FormGroup>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col sm={12} md={6}>
          <FormGroup
            controlId="uxName"
            validationState={isFinishValid ? null : 'error'}
          >
            <ControlLabel>End Date</ControlLabel>
            <FormControl
              name="finishDate"
              onChange={handleInputChange}
              required
              type="date"
              value={finishDate}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6}>
          <FormGroup
            controlId="uxName"
            validationState={isFinishValid ? null : 'error'}
          >
            <ControlLabel>End Time</ControlLabel>
            <FormControl
              name="finishTime"
              onChange={handleInputChange}
              required
              type="time"
              value={finishTime}
            />
            {!isFinishValid && (
              <HelpBlock>
                <FormattedMessage
                  id="validateFinishTime"
                  defaultMessage="Must begin after the start time"
                />
              </HelpBlock>
            )}
          </FormGroup>
        </Col>
      </Row>

      <hr />

      <Button block disabled={!isFinishValid || !isStartValid} type="submit">
        {downtime ? 'Update Downtime' : 'Create New Downtime'}
      </Button>
    </Form>
  </div>
);

BlockMachineForm.defaultProps = {
  downtime: null,
  initialValues: null,
};

BlockMachineForm.propTypes = {
  description: PropTypes.string.isRequired,
  downtime: PropTypes.string,
  finishDate: PropTypes.string.isRequired,
  finishTime: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    description: PropTypes.string,
  }),
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
};

export default BlockMachineForm;
