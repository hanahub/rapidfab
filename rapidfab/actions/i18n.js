import ActionType from 'rapidfab/constants';

/* eslint-disable import/prefer-default-export */

export function change(currentLocale = navigator.language, newLocale) {
  return {
    type: ActionType.LOCALE_CHANGE,
    data: {
      currentLocale,
      newLocale,
    },
  };
}
