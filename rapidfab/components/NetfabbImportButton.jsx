import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Actions from 'rapidfab/actions';
import Loading from 'rapidfab/components/Loading';

const NetfabbImportButton = ({ dispatch, lineItemUri, submitting }) => (
  <Button
    block
    disabled={submitting}
    onClick={() => {
      dispatch(Actions.Api.wyatt.netfab.list({ line_item: lineItemUri }, true));
    }}
  >
    {submitting ? <Loading /> : <span>Import to Netfabb</span>}
  </Button>
);

NetfabbImportButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lineItemUri: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(state => ({
  submitting: state.ui.wyatt.netfab.list.fetching,
}))(NetfabbImportButton);
