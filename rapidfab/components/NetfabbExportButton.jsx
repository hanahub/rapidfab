import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Actions from 'rapidfab/actions';

const NetfabbExportButton = ({ dispatch, lineItemUri }) => (
  <Button
    block
    onClick={() => {
      dispatch(Actions.Api.wyatt.netfab.post({ line_item: lineItemUri }));
    }}
  >
    Export to Netfabb
  </Button>
);

NetfabbExportButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lineItemUri: PropTypes.string.isRequired,
};

export default connect()(NetfabbExportButton);
