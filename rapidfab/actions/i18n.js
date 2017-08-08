import ActionType from 'rapidfab/constants';

export function change(currentLocale, newLocale) {
  currentLocale = currentLocale || navigator.language;
  return {
    type: ActionType.LOCALE_CHANGE,
    data: {
      currentLocale,
      newLocale,
    },
  };
}
