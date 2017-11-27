import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import { FormattedMessage } from 'rapidfab/i18n';

const RunModelDownload = ({
  handleDownload,
  isDownloading,
  model,
  name,
  run,
}) => (
  <span>
    {isDownloading ? (
      <FormattedMessage id="downloading" defaultMessage="Downloading..." />
    ) : (
      <a onClick={() => handleDownload(run, model)}>{name || model} </a>
    )}
  </span>
);

RunModelDownload.propTypes = {
  handleDownload: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
