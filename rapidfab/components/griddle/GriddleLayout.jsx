import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';

const GriddleLayout = ({ Table, Pagination, Filter }) => (
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

GriddleLayout.propTypes = {
  Table: PropTypes.func.isRequired,
  Pagination: PropTypes.func.isRequired,
  Filter: PropTypes.func.isRequired,
};

export default GriddleLayout;
