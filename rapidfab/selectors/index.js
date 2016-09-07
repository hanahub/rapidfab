import { createSelector } from 'reselect'

const getSessions = state => state.api.pao.sessions
const getResources = state => state.resources

export const getSession = createSelector(
  [ getSessions, getResources ],
  (sessions, resources) => {
    if(sessions.length < 1) return
    const sessionUuid = sessions[0]
    return resources[sessionUuid]
  }
)
