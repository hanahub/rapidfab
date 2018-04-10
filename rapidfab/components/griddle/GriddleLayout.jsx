import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';

const NewLayout = ({ Table, Pagination, Filter }) => (
  <Grid>
    <Row style={{ marginBottom: '1rem' }}>
      <Col xs={6}>
        <Filter />
      </Col>
      <Col xs={6}>
        <Pagination />
      </Col>
    </Row>
    <Row>
      <Table />
    </Row>
  </Grid>
);

NewLayout.propTypes = {
  Table: PropTypes.element.isRequired,
  Pagination: PropTypes.element.isRequired,
  Filter: PropTypes.element.isRequired,
};

export default NewLayout;
