import React from 'react';
import PropTypes from 'prop-types';

import { Col, Grid, Nav, NavItem, PageHeader, Row } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';
import { RUN_OPERATION_MAP } from 'rapidfab/mappings';

import RunPrintsContainer from 'rapidfab/containers/records/run/RunPrintsContainer';
import RunPrintsEditContainer from 'rapidfab/containers/records/run/RunPrintsEditContainer';
import RunRecordFormContainer from 'rapidfab/containers/records/run/RunRecordFormContainer';

import RunData from './RunData';
import RunDocuments from './RunDocuments';
import RunRequeueButton from './RunRequeueButton';
import RunScheduleButton from './RunScheduleButton';

const styles = {
  spacingTop: { marginTop: '1rem' },
};

const RunRecord = ({
  handleSelectTab,
  id,
  isRunFetching,
  operation,
  tab,
  uuid,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['runs', id || '']} />

    <PageHeader>
      {operation ? RUN_OPERATION_MAP[operation] : null} Run
    </PageHeader>

    <Nav bsStyle="tabs" activeKey={tab} onSelect={handleSelectTab}>
      <NavItem eventKey={1}>Summary</NavItem>
      <NavItem eventKey={2}>Change Prints</NavItem>
    </Nav>

    <FlashMessages />

    <Col xs={12} style={styles.spacingTop}>
      {isRunFetching ? (
        <Loading />
      ) : (
        <Row>
          {tab === 1 && (
            <div>
              <Col xs={12} sm={6} md={4}>
                <RunRequeueButton />
                <RunScheduleButton uuid={uuid} />
                <RunData />
              </Col>

              <Col xs={12} sm={6} md={8}>
                <RunRecordFormContainer />
                <div style={styles.spacingTop}>
                  <RunPrintsContainer />
                  <RunDocuments uuid={uuid} />
                </div>
              </Col>
            </div>
          )}
          {tab === 2 && (
            <RunPrintsEditContainer handleSelectTab={handleSelectTab} />
          )}
        </Row>
      )}
    </Col>
  </Grid>
);

RunRecord.defaultProps = {
  id: null,
  operation: null,
  uuid: null,
};

RunRecord.propTypes = {
  handleSelectTab: PropTypes.func.isRequired,
  id: PropTypes.string,
  isRunFetching: PropTypes.bool.isRequired,
  operation: PropTypes.string,
  tab: PropTypes.number.isRequired,
  uuid: PropTypes.string,
};

export default RunRecord;
