import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  PageHeader,
  Panel,
  Row,
  Table,
} from 'react-bootstrap';

import extractUuid from 'rapidfab/utils/extractUuid';
import { RUN_OPERATION_MAP } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';

const RunRecordSchedule = ({
  currentStart,
  handleBack,
  handleInputChange,
  handleSubmit,
  id,
  isStartValid,
  operation,
  printerQueue,
  startDate,
  startTime,
  submitting,
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
    <Button onClick={() => handleBack(uri)} style={{ marginBottom: '3rem' }}>
      <FontAwesome name="arrow-left" />
      {` `}
      Back to Run
    </Button>
    <Row>
      <Col xs={12} lg={6}>
        <Panel header="Printer Queue">
          <Table fill responsive>
            <thead>
              <tr>
                <th>Run ID</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {printerQueue.map(runEvent => (
                <tr>
                  <td>
                    <a href={`#/records/run/${extractUuid(runEvent.uri)}`}>
                      {runEvent.id.substr(runEvent.id.length - 7)}
                    </a>
                  </td>
                  <td>
                    <FormattedDateTime value={runEvent.estimates.start} />
                  </td>
                  <td>
                    <FormattedDateTime value={runEvent.estimates.end} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </Col>
      <Col xs={12} lg={6}>
        <Panel>
          <strong>Current Start:</strong>
          {` `}
          <FormattedDateTime value={currentStart} />
          <hr />
          <Form onSubmit={handleSubmit}>
            <FormGroup
              controlId="uxName"
              validationState={isStartValid ? null : 'error'}
            >
              <ControlLabel>New Start Date</ControlLabel>
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
              <ControlLabel>New Start Time</ControlLabel>
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
              {submitting ? <Loading /> : 'Reschedule Run'}
            </Button>
          </Form>
        </Panel>
      </Col>
    </Row>
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
  printerQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  uri: PropTypes.string.isRequired,
};

export default RunRecordSchedule;
