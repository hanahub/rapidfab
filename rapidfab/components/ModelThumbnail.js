import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

const Loading = () => (
  <div className="text-center">
    <Fa name="spinner" spin/>
    <span> </span>
    <FormattedMessage id="loading.thumbnail" defaultMessage="Loading Thumbnail..."/>
  </div>
);

const ModelThumbnail = ({ snapshot, itar }) => {
  if (itar)
    return <span>ITAR Model</span>
  else if (!snapshot)
    return <Loading />
  else
    return <Thumbnail src={model.snapshot_content} />
};

ModelThumbnail.propTypes = {
  itar: PropTypes.bool,
  model: PropTypes.object
};

export default ModelThumbnail;
