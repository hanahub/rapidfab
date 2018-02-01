import Constants, { VOLUME_UNITS } from 'rapidfab/constants';

const volumeUnitsReducer = (state = 'cm3', action) => {
  switch (action.type) {
    case Constants.VOLUME_UNITS_CHANGE_CM:
      return VOLUME_UNITS.cm;
    case Constants.VOLUME_UNITS_CHANGE_IN:
      return VOLUME_UNITS.in;
    default:
      return state;
  }
};

export default volumeUnitsReducer;
