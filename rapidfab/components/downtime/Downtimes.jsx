import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import extractUuid from 'rapidfab/utils/extractUuid';

import { FormattedDateTime } from 'rapidfab/i18n';
import Loading from 'rapidfab/components/Loading';

const styles = {
  listRow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  spacingRight: {
    marginRight: '2rem',
  },
  timeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};

const Downtimes = ({ downtimes, handleSelectionChange, loading }) => (
  <Panel
    header={
      loading ? (
        <Loading />
      ) : (
        `${downtimes.length === 0 ? 'No' : ''} Scheduled Downtime`
      )
    }
  >
    <ListGroup fill>
      {downtimes.map(downtime => (
        <ListGroupItem
          onClick={() => handleSelectionChange(extractUuid(downtime.uri))}
          key={downtime.uri}
        >
          <div style={styles.listRow}>
            <Fa style={styles.spacingRight} name="clock-o" />
            <div style={{ width: '100%' }}>
              <span>{downtime.description}</span>
              <span style={styles.timeRow}>
                <span>Start:</span> <FormattedDateTime value={downtime.start} />
              </span>
              <span style={styles.timeRow}>
                <span>Finish:</span>{' '}
                <FormattedDateTime value={downtime.finish} />
              </span>
            </div>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </Panel>
);

Downtimes.propTypes = {
  downtimes: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      finish: PropTypes.string,
      start: PropTypes.string,
    })
  ).isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Downtimes;
