/* eslint-disable no-console */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const saveState = state => {
  try {
    const { i18n, units } = state;
    const serializedState = JSON.stringify({ i18n, units });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};
