import PathToRegexp from 'path-to-regexp';

export default function extractUuid(uri) {
  const keys = [];
  const pattern = PathToRegexp(':protocol//:domain/:resource/:uuid/', keys);
  const match = pattern.exec(uri);
  if (!match || !match.length || match.length !== 5) {
    return null;
  }
  return match[match.length - 1];
}
