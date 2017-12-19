import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  PageHeader,
} from 'react-bootstrap';

import { RUN_OPERATION_MAP } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

const RunRecordSchedule = ({
  handleInputChange,
  handleSubmit,
  id,
  isStartValid,
  operation,
  startDate,
  startTime,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['runs', id]} />
    <PageHeader>
      Rescheduling
      {` `}
      {operation ? RUN_OPERATION_MAP[operation] : null}
      {` `}
      Run
    </PageHeader>
    <FlashMessages />
    <Form onSubmit={handleSubmit}>
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
      <Button block disabled={!isStartValid} type="submit">
        Reschedule Run
      </Button>
    </Form>
  </Grid>
);

RunRecordSchedule.defaultProps = {
  isStartValid: true,
  startDate: null,
  startTime: null,
};

RunRecordSchedule.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isStartValid: PropTypes.bool,
  id: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  startTime: PropTypes.string,
};

export default RunRecordSchedule;
