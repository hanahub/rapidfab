import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, ButtonGroup } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import Actions from 'rapidfab/actions';
import { getRouteUUIDResource } from 'rapidfab/selectors';

import { FormattedMessage } from 'rapidfab/i18n';

const styles = { spacingBelow: { marginBottom: '2rem' } };

const RunRequeueButton = ({ handleRequeue, isSending, uri }) => (
  <ButtonGroup style={styles.spacingBelow} vertical block>
    <Button disabled={!uri || isSending} onClick={() => handleRequeue(uri)}>
      {isSending ? (
        <Fa name="spinner" spin />
      ) : (
        <FormattedMessage
          id="scheduleAsNextPrint"
          defaultMessage="Schedule As Next Print"
        />
      )}
    </Button>
  </ButtonGroup>
);

RunRequeueButton.defaultProps = { uri: null };

RunRequeueButton.propTypes = {
  handleRequeue: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  uri: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  handleRequeue: uri => {
    dispatch(Actions.Api.wyatt['run-queue'].post({ run: uri })).then(() => {
      dispatch(Actions.Api.wyatt.run.get(uri));
    });
  },
});

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  const isSending = state.ui.wyatt['run-queue'].post.fetching;
  return Object.assign({ isSending }, run ? { uri: run.uri } : {});
};

export default connect(mapStateToProps, mapDispatchToProps)(RunRequeueButton);
