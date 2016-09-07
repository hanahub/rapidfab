import _                  from "lodash"
import { createSelector } from 'reselect'

const getStateResources   = state => state.resources

const getStateSessions    = state => state.api.pao.sessions
const getStateLocations   = state => state.api.wyatt.location
const getStateUsers       = state => state.api.pao.users

export const getSession = createSelector(
  [ getStateSessions, getStateResources ],
  (sessions, resources) => {
    if(sessions.length < 1) return
    const sessionUuid = sessions[0]
    return resources[sessionUuid]
  }
)

export const getLocations = createSelector(
  [ getStateLocations, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getUsers = createSelector(
  [ getStateUsers, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)
