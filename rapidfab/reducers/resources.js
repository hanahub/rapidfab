import _                from 'lodash';
import Constants        from 'rapidfab/constants';
import PathToRegexp     from 'path-to-regexp'

export function extractUuid(uri) {
  let keys = [];
  let pattern = PathToRegexp(`:protocol//:domain/:resource/:uuid/`, keys);
  let match = pattern.exec(uri);
  if(!match.length) {
    throw new Error(`Could not extract uuid from uri: ${uri}`)
  }
  return match[match.length - 1]
}

export function hydrateRecord(record) {
  if(!record || !record.uri) return record;
  let uuid = extractUuid(record.uri);
  return Object.assign({}, record, {
    uuid,
    id: uuid.substr(uuid.length - 6)
  });
}

function reducer(state = {}, action) {
  let record = null
  switch (action.type) {
    case Constants.RESOURCE_GET_SUCCESS:
      record = hydrateRecord(action.json);
      return _.assign({}, state, {
        [record.uuid]: record
      })
    case Constants.RESOURCE_PUT_SUCCESS:
      record = hydrateRecord(
        _.assign({}, state[action.uuid], action.payload)
      )
      return _.assign({}, state, {
        [record.uuid]: record
      })
    case Constants.RESOURCE_POST_SUCCESS:
      record = hydrateRecord(_.assign(action.payload, {
        uri: action.headers.location
      }));
      return _.assign({}, state, {
        [record.uuid]: record
      })
    case Constants.RESOURCE_LIST_SUCCESS:
      let records = _.map(action.json.resources, hydrateRecord);
      return _.assign({}, state, _.keyBy(records, 'uuid'))
    case Constants.RESOURCE_DELETE_SUCCESS:
      return _.assign({}, _.omit(state, action.uuid))
    default:
      return state
  }
}

export default reducer
