import _                  from 'lodash'
import Constants          from 'rapidfab/constants'
import { extractUuid }    from 'rapidfab/reducers/makeApiReducers'

export const initialState = {
  location: null,
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case Constants.STORE_LOCATION:
      return Object.assign({}, state, {
        location: action.location,
      })
    default:
      return state
  }
}

export default reducer
