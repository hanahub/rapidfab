import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Thumbnail } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

const Itar = () => (
  <Panel>
    <div className="text-center">
      <FormattedMessage id="record.itar" defaultMessage="ITAR Model" />
    </div>
  </Panel>
);

const Loading = () => (
  <Panel>
    <div className="text-center">
      <Fa name="spinner" spin />
      <span />
      <FormattedMessage
        id="loading.thumbnail"
        defaultMessage="Loading Thumbnail..."
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

const Error = () => (
  <Panel>
    <div className="text-center">
      <FormattedMessage id="status.error" defaultMessage="Error" />
    </div>
  </Panel>
);

const ModelThumbnail = ({ snapshot }) => {
  switch (snapshot) {
    case 'ERROR':
      return <Error />;
    case 'ITAR':
      return <Itar />;
    case 'LOADING':
      return <Loading />;
    case 'NO_SNAPSHOT':
      return <NoSnapshot />;
    default:
      return <Thumbnail src={snapshot} />;
  }
};

ModelThumbnail.propTypes = {
  snapshot: PropTypes.string,
};

export default ModelThumbnail;
