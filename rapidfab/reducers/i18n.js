import Constants from 'rapidfab/constants';
import i18n from 'rapidfab/i18n';

function initialState(navigator) {
  if (i18n[navigator.language]) {
    return {
      locale: navigator.language,
      messages: i18n[navigator.language].messages,
    };
  }

  return {
    locale: 'en-US',
    messages: i18n['en-US'].messages,
  };
}

function reducer(state = initialState(navigator), action) {
  switch (action.type) {
    case Constants.LOCALE_CHANGE:
      return Object.assign({}, state, {
        locale: action.data.newLocale,
        messages: i18n[action.data.newLocale].messages,
      });
    default:
      return state;
  }
}

export default reducer;
