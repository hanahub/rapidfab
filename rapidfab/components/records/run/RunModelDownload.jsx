import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import { FormattedMessage } from 'rapidfab/i18n';

const RunModelDownload = ({ run, model, handleDownload, isDownloading }) => (
  <span>
    {isDownloading ? (
      <FormattedMessage id="downloading" defaultMessage="Downloading..." />
    ) : (
      <a onClick={() => handleDownload(run, model)}>{model} </a>
    )}
  </span>
);

RunModelDownload.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  handleDownload: PropTypes.func.isRequired,
  run: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleDownload: (run, model) => {
    dispatch(Actions.DownloadModel.fetchModel(model)).then(response => {
      dispatch(
        Actions.DownloadModel.downloadContent(
          `${run}.stl`,
          response.json.content
        )
      );
    });
  },
});

const mapStateToProps = state => ({
  isDownloading: state.downloadModel.downloadingModel,
});

export default connect(mapStateToProps, mapDispatchToProps)(RunModelDownload);
