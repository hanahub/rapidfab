import React from 'react';
import PropTypes from 'prop-types';

import { Col, Grid, Nav, NavItem, PageHeader, Row } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import RunPrintsContainer from 'rapidfab/containers/records/run/RunPrintsContainer';
import RunRecordFormContainer from 'rapidfab/containers/records/run/RunRecordFormContainer';

import RunActuals from './RunActuals';
import RunEstimates from './RunEstimates';
import RunRequeueButton from './RunRequeueButton';

const RunRecord = ({ handleSelectTab, id, tab }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['runs', id || '']} />

    <PageHeader>
      Run <small>{id}</small>
    </PageHeader>

    <Nav bsStyle="tabs" activeKey={tab} onSelect={handleSelectTab}>
      <NavItem eventKey={1}>Summary</NavItem>
      <NavItem eventKey={2}>Change Prints</NavItem>
    </Nav>

    <FlashMessages />

    <Col xs={12} style={{marginTop: '1rem'}}>
      <Row>
      {tab === 1 && (
        <div>
          <Col xs={12} sm={4}>
            <RunRequeueButton />
            <RunEstimates />
            <RunActuals />
          </Col>

          <Col xs={12} sm={8}>
            <RunRecordFormContainer />
            <RunPrintsContainer />
          </Col>
        </div>
      )}
      {tab === 2 && (
        <span>edit run content</span>
      )}
    </Row>
    </Col>
  </Grid>
);

RunRecord.defaultProps = { id: null };

RunRecord.propTypes = {
  handleSelectTab: PropTypes.func.isRequired,
  id: PropTypes.string,
  tab: PropTypes.number.isRequired,
};

export default RunRecord;
