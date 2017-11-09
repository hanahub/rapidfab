import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import BlockMachineFormContainer from 'rapidfab/containers/inventory/BlockMachineFormContainer';

const BlockMachines = ({
  blockMachines,
  machineType,
  uri,
}) => (
  <div>
    <BlockMachineFormContainer machineType={machineType} uri={uri} />

    {blockMachines.map(block => (
      <p key={block.uri}>
        {block.description} - {block.start} - {block.finish}
      </p>
    ))}
  </div>
);

BlockMachines.propTypes = {
  blockMachines: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      finish: PropTypes.string,
      start: PropTypes.string,
    })
  ).isRequired,
  machineType: PropTypes.oneOf(['post-processor', 'printer']).isRequired,
  uri: PropTypes.string.isRequired,
};

export default BlockMachines;
