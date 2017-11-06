import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, ProgressBar, Row } from 'react-bootstrap';

const statusStyleMapping = {
  'not-uploaded': 'primary',
  processing: 'info',
  processed: 'success',
};

const statusDisplayMapping = {
  'not-uploaded': (
    <FormattedMessage id="status.uploading" defaultMessage="Uploading" />
  ),
  processing: (
    <FormattedMessage id="status.processing" defaultMessage="Processing" />
  ),
  processed: (
    <FormattedMessage id="status.complete" defaultMessage="Complete" />
  ),
};

const Uploading = ({ status, percent }) => (
  <Row>
    <Col xsOffset={2} xs={8}>
      <ProgressBar
        striped
        bsStyle={statusStyleMapping[status]}
        now={percent}
        active={status === 'processing'}
      />
    </Col>
    <Col xsOffset={2} xs={8} style={{ textAlign: 'center' }}>
      <h4>{statusDisplayMapping[status]}</h4>
    </Col>
  </Row>
);

Uploading.propTypes = {
  percent: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const { modelUuid, percent } = state.uploadModel;
  const { status } = state.resources[modelUuid];

  return { status, percent };
};

export default connect(mapStateToProps)(Uploading);
