import Constants, { UNITS } from 'rapidfab/constants';

const unitsReducer = (state = 'metric', action) => {
  switch (action.type) {
    case Constants.UNITS_CHANGE_METRIC:
      return UNITS.metric;
    case Constants.UNITS_CHANGE_IMPERIAL:
      return UNITS.imperial;
    default:
      return state;
  }
};

export default unitsReducer;
