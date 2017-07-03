import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Thumbnail } from 'react-bootstrap';
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
    return <Panel>ITAR Model</Panel>
  else if (snapshot === 'NO_SNAPSHOT')
    return <Panel>No Snapshot</Panel>
  else if (snapshot)
    return <Thumbnail src={snapshot} />
  else
    return <Loading />
};

ModelThumbnail.propTypes = {
  itar: PropTypes.bool,
  model: PropTypes.object
};

export default ModelThumbnail;
