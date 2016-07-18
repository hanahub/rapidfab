import _         from 'lodash';
import Constants from 'rapidfab/constants';
import i18n      from 'rapidfab/i18n';

const initialState = {
  locale: navigator.language,
  messages: i18n[navigator.language].messages
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.LOCALE_CHANGE:
      return _.assign({}, state, {
        locale: action.data.newLocale,
        messages: i18n[action.data.newLocale].messages
      });
    default:
      return state
  }
}

export default reducer
