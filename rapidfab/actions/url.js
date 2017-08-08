import ActionType from 'rapidfab/constants';

export function change(currentHash, newHash) {
  return {
    type: ActionType.HASH_CHANGE,
    data: {
      currentHash,
      newHash,
    },
  };
}

export function replace(newUrl) {
  const previousUrl = window.location.href;
  history.replaceState(null, '', `#${newUrl}`);
  return change(previousUrl, window.location.href);
}

export function navigate(newUrl, query) {
  const previousUrl = window.location.href;
  let url = `#${newUrl}`;
  if (query) {
    url = `?nextPath=${query}${url}`;
  } else {
    url = `/${url}`;
  }
  history.pushState(null, '', url);
  return change(previousUrl, window.location.href);
}
