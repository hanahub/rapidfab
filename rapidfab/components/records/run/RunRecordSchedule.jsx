import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  PageHeader,
  Panel,
  Table,
} from 'react-bootstrap';

import { RUN_OPERATION_MAP } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

const RunRecordSchedule = ({
  currentStart,
  handleBack,
  handleInputChange,
  handleSubmit,
  id,
  isStartValid,
  operation,
  startDate,
  startTime,
  uri,
}) => (
  <Grid>
    <BreadcrumbNav breadcrumbs={['runs', id]} />
    <PageHeader>
      Rescheduling
      {` `}
      {operation ? RUN_OPERATION_MAP[operation] : null}
      {` `}
      Run
    </PageHeader>
    <FlashMessages />
    <Button onClick={() => handleBack(uri)}>
      <FontAwesome name="arrow-left" />
      {` `}
      Back to Run
    </Button>
    <Panel>
      <Table bordered condensed fill>
        <tr>
          <td>
            <strong>Current Start</strong>
          </td>
          <td>
            <FormattedDateTime value={currentStart} />
          </td>
        </tr>
      </Table>
    </Panel>
    <Panel>
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
    </Panel>
  </Grid>
);

RunRecordSchedule.propTypes = {
  currentStart: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isStartValid: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
};

export default RunRecordSchedule;
