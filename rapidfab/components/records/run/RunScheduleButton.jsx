import PropTypes from 'prop-types';
import React from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import { FormattedMessage } from 'rapidfab/i18n';

const styles = { spacingBelow: { marginBottom: '2rem' } };

const RunScheduleButton = ({ id }) => {
  const link = `#/records/run/${id}/schedule`;
  return (
    <ButtonGroup style={styles.spacingBelow} vertical block>
      <Button href={link}>
        <Fa name="clock-o" />{' '}
        <FormattedMessage
          id="manuallySchedule"
          defaultMessage="Manually Schedule"
        />
      </Button>
    </ButtonGroup>
  );
};
RunScheduleButton.defaultProps = {
  id: null,
};
RunScheduleButton.propTypes = {
  id: PropTypes.string,
};
export default RunScheduleButton;
