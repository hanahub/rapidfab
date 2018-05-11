import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Actions from 'rapidfab/actions';
import Loading from 'rapidfab/components/Loading';

const NetfabbExportButton = ({ dispatch, lineItemUri, submitting }) => (
  <Button
    block
    disabled={submitting}
    onClick={() => {
      dispatch(Actions.Api.wyatt.netfab.post({ line_item: lineItemUri }));
    }}
  >
    {submitting ? <Loading /> : <span>Export to Netfabb</span>}
  </Button>
);

NetfabbExportButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lineItemUri: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(state => ({
  submitting: state.ui.wyatt.netfab.post.fetching,
}))(NetfabbExportButton);
