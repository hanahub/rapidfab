import React from 'react';
import PropTypes from 'prop-types';

const BlockMachines = ({ blockMachines }) => (
  <div>
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
};

export default BlockMachines;
