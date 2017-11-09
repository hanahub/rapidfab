import React from 'react';
import PropTypes from 'prop-types';

import BlockMachineFormContainer from 'rapidfab/containers/blockMachine/BlockMachineFormContainer';
import BlockMachinesContainer from 'rapidfab/containers/blockMachine/BlockMachinesContainer';

const BlockMachine = ({ machineType, uri }) => (
  <div>
    <BlockMachineFormContainer machineType={machineType} uri={uri} />
    <BlockMachinesContainer />
  </div>
);

BlockMachine.propTypes = {
  machineType: PropTypes.oneOf(['post-processor', 'printer']).isRequired,
  uri: PropTypes.string.isRequired,
};

export default BlockMachine;
