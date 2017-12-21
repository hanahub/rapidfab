import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { Button, Col, Grid } from 'react-bootstrap';

import isUuid from 'rapidfab/utils/isUuid';

import { FormattedMessage } from 'rapidfab/i18n';
import DowntimeDeleteContainer from 'rapidfab/containers/blockMachine/DowntimeDeleteContainer';
import DowntimeFormContainer from 'rapidfab/containers/blockMachine/DowntimeFormContainer';
import DowntimesContainer from 'rapidfab/containers/blockMachine/DowntimesContainer';

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
  spacingTop: {
    marginTop: '1rem',
  },
};

const Downtime = ({
  handleSelectionChange,
  machineType,
  machineUri,
  selection,
}) => (
  <Grid>
    <div style={styles.buttonRow}>
      <Button onClick={() => handleSelectionChange('add')}>
        <FormattedMessage
          id="addNewDowntime"
          defaultMessage="Add New Downtime"
        />
      </Button>
    </div>

    <Col xs={12} sm={6}>
      <DowntimesContainer
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
          <DowntimeFormContainer
            handleSelectionChange={handleSelectionChange}
            machineType={machineType}
            machineUri={machineUri}
          />
        )}
        {isUuid(selection) && (
          <div>
            <DowntimeFormContainer
              downtime={selection}
              handleSelectionChange={handleSelectionChange}
              machineType={machineType}
              machineUri={machineUri}
            />
            <Button
              block
              onClick={() => handleSelectionChange(`DELETE/${selection}`)}
              style={styles.spacingTop}
            >
              Delete Downtime
            </Button>
          </div>
        )}
        {selection.split('/')[0] === 'DELETE' && (
          <DowntimeDeleteContainer
            handleSelectionChange={handleSelectionChange}
            uuid={selection.split('/')[1]}
          />
        )}
      </div>
    </Col>
  </Grid>
);

Downtime.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
  machineType: PropTypes.oneOf(['post-processor', 'printer']).isRequired,
  machineUri: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
};

export default Downtime;
