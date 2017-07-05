import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Thumbnail } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

const Itar = () => (
  <Panel>
    <div className="text-center">
      <FormattedMessage
        id="record.itar"
        defaultMessage="ITAR Model"
      />
    </div>
  </Panel>
);

const NoSnapshot = () => (
  <Panel>
    <div className="text-center">
      <FormattedMessage
        id="record.snapshot.none"
        defaultMessage="No Snapshot"
      />
    </div>
  </Panel>
);

const Loading = () => (
  <Panel>
    <div className="text-center">
      <Fa name="spinner" spin/>
      <span> </span>
      <FormattedMessage
        id="loading.thumbnail"
        defaultMessage="Loading Thumbnail..."
      />
    </div>
  </Panel>
);

const ModelThumbnail = ({ snapshot, itar }) => {
  if (itar)
    return <Itar />
  else if (snapshot === 'NO_SNAPSHOT')
    return <NoSnapshot />
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
