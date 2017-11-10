import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { Button, Col, Grid } from 'react-bootstrap';

import isUuid from 'rapidfab/utils/isUuid';

import { FormattedMessage } from 'rapidfab/i18n';
import BlockMachineDeleteContainer from 'rapidfab/containers/blockMachine/BlockMachineDeleteContainer';
import BlockMachineFormContainer from 'rapidfab/containers/blockMachine/BlockMachineFormContainer';
import BlockMachinesContainer from 'rapidfab/containers/blockMachine/BlockMachinesContainer';

const styles = {
  border: {
    border: '1px solid rgb(67, 72, 87)',
    borderRadius: '4px',
    padding: '10px 15px',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '1rem 0 2rem 0',
  },
};

const BlockMachine = ({
  handleSelectionChange,
  machineType,
  machineUri,
  selection,
}) => (
  <Grid>
    <div style={styles.buttonRow}>
      <Button onClick={() => handleSelectionChange('add')}>
        <FormattedMessage id="addNewBlock" defaultMessage="Add New Block" />
      </Button>
    </div>

    <Col xs={12} sm={6}>
      <BlockMachinesContainer
        handleSelectionChange={handleSelectionChange}
        machineUri={machineUri}
      />
    </Col>
    <Col xs={12} sm={6}>
      <div style={selection !== 'none' ? styles.border : null}>
        {selection !== 'none' && (
          <Button onClick={() => handleSelectionChange('none')}>
            <Fa name="arrow-left" />
          </Button>
        )}
        {selection === 'add' && (
          <div>
            <h2>Create New Block Machine</h2>
            <BlockMachineFormContainer
              handleSelectionChange={handleSelectionChange}
              machineType={machineType}
              machineUri={machineUri}
            />
          </div>
        )}
        {isUuid(selection) && (
          <div>
            <h2>Edit</h2>
            <BlockMachineFormContainer
              downtime={selection}
              handleSelectionChange={handleSelectionChange}
              machineType={machineType}
              machineUri={machineUri}
            />
            <Button block onClick={() => handleSelectionChange(`DELETE/${selection}`)}>
              Delete Downtime
            </Button>
          </div>
        )}
        { selection.split('/')[0] === 'DELETE' && (
          <BlockMachineDeleteContainer
            handleSelectionChange={handleSelectionChange}
            uuid={selection.split('/')[1]}
          />
        )}
      </div>
    </Col>
  </Grid>
);

BlockMachine.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
  machineType: PropTypes.oneOf(['post-processor', 'printer']).isRequired,
  machineUri: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
};

export default BlockMachine;
