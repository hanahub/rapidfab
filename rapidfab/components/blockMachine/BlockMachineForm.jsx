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
  Row,
} from 'react-bootstrap';

const BlockMachineForm = ({
  description,
  downtime,
  finishDate,
  finishTime,
  handleInputChange,
  handleSubmit,
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
          <FormGroup controlId="uxName">
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
          <FormGroup controlId="uxName">
            <ControlLabel>Start Time</ControlLabel>
            <FormControl
              name="startTime"
              onChange={handleInputChange}
              required
              type="time"
              value={startTime}
            />
          </FormGroup>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col sm={12} md={6}>
          <FormGroup controlId="uxName">
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
          <FormGroup controlId="uxName">
            <ControlLabel>End Time</ControlLabel>
            <FormControl
              name="finishTime"
              onChange={handleInputChange}
              required
              type="time"
              value={finishTime}
            />
          </FormGroup>
        </Col>
      </Row>

      <hr />

      <Button block type="submit">
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
