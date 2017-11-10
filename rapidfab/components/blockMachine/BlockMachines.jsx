import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';

import { FormattedDateTime } from 'rapidfab/i18n';

import extractUuid from 'rapidfab/utils/extractUuid';

import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

const styles = {
  listRow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  spacingHorizontal: {
    margin: '0 2rem',
  },
  timeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};

const BlockMachines = ({ blockMachines, handleSelectionChange }) => (
  <Panel header="Scheduled Downtime">
    <ListGroup fill>
      {blockMachines.map(block => (
        <ListGroupItem
          onClick={() => handleSelectionChange(extractUuid(block.uri))}
          header={block.description}
          key={block.uri}
        >
          <div style={styles.listRow}>
            <Fa style={styles.spacingHorizontal} name="clock-o" />
            <div style={{ width: '100%' }}>
              <span style={styles.timeRow}>
                <span>Start:</span> <FormattedDateTime value={block.start} />
              </span>
              <span style={styles.timeRow}>
                <span>Finish:</span> <FormattedDateTime value={block.finish} />
              </span>
            </div>
          </div>
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
  handleSelectionChange: PropTypes.func.isRequired,
};

export default BlockMachines;
