import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Actions from 'rapidfab/actions';

const NetfabbImportButton = ({ dispatch, lineItemUri }) => (
  <Button
    block
    onClick={() => {
      dispatch(Actions.Api.wyatt.netfab.get({ line_item: lineItemUri }));
    }}
  >
    Import to Netfabb
  </Button>
);

NetfabbImportButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lineItemUri: PropTypes.string.isRequired,
};

export default connect()(NetfabbImportButton);
