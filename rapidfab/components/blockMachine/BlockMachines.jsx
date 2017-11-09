import React from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

const BlockMachines = ({ blockMachines }) => (
  <Panel header="Blocks">
    <ListGroup fill>
      {blockMachines.map(block => (
        <ListGroupItem key={block.uri}>
          {block.description} - {block.start} - {block.finish}
        </ListGroupItem>
      ))}
    </ListGroup>
  </Panel>
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
