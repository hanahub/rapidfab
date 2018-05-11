import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Actions from 'rapidfab/actions';
import Loading from 'rapidfab/components/Loading';
import extractUuid from 'rapidfab/utils/extractUuid';

const NetfabbImportButton = ({ dispatch, lineItemUri, submitting }) => (
  <Button
    block
    disabled={submitting}
    onClick={() => {
      dispatch(
        Actions.Api.wyatt.netfab.list({ line_item: lineItemUri }, true)
      ).then(response => {
        const model = response.json.resources[0].exported_model;
        dispatch(
          Actions.Api.wyatt['line-item'].put(extractUuid(lineItemUri), {
            model,
          })
        );
      });
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
