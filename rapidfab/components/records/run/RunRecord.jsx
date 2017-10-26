import React from 'react';
import PropTypes from 'prop-types';

import { Col, Grid, PageHeader } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import RunPrintsContainer from 'rapidfab/containers/records/run/RunPrintsContainer';
import RunRecordFormContainer from 'rapidfab/containers/records/run/RunRecordFormContainer';

import RunActuals from './RunActuals';
import RunEstimates from './RunEstimates';
import RunRequeueButton from './RunRequeueButton';

const RunRecord = ({ id }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['runs', id || '']} />

    <PageHeader>
      Run <small>{id}</small>
    </PageHeader>

    <FlashMessages />

    <Col xs={12} sm={4}>
      <RunRequeueButton />
      <RunEstimates />
      <RunActuals />
    </Col>

    <Col xs={12} sm={8}>
      <RunRecordFormContainer />
      <RunPrintsContainer />
    </Col>
  </Grid>
);

RunRecord.defaultProps = { id: null };

RunRecord.propTypes = { id: PropTypes.string };

export default RunRecord;
