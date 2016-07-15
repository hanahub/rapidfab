import ActionType     from 'rapidfab/constants';

export function changeLocal(oldLocale, newLocale) {
  oldLocale = oldLocale || navigator.language;
  return {
    type  : ActionType.LOCALE_CHANGE,
    data  : {
      oldLocale: oldLocale,
      newLocale: newLocale
    }
  }
}
