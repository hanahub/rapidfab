import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const TimeDisplay = ({ seconds }) => {
  const convertedTime = Moment.duration(seconds, 'seconds');
  let displayTime = `${convertedTime.seconds()} s`;
  if (convertedTime.minutes()) {
    displayTime = `${convertedTime.minutes()} m ${displayTime}`;
    if (convertedTime.hours()) {
      displayTime = `${convertedTime.hours()} h ${displayTime}`;
      if (convertedTime.days()) {
        displayTime = `${convertedTime.days()} d ${displayTime}`;
      }
    }
  }
  return <span>{displayTime}</span>;
};

TimeDisplay.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default TimeDisplay;
