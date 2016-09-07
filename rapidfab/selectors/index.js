import _                  from "lodash"
import { createSelector } from 'reselect'

const getStateResources           = state => state.resources

const getStateModels              = state => state.api.hoth.model
const getStateMemberships         = state => state.api.pao.memberships
const getStateSessions            = state => state.api.pao.sessions
const getStateUsers               = state => state.api.pao.users
const getStateLocations           = state => state.api.wyatt.location
const getStatePostProcessorTypes  = state => state.api.wyatt['post-processor-type']
const getStatePostProcessors      = state => state.api.wyatt['post-processor']
const getStateManufacturers       = state => state.api.wyatt.manufacturer
const getStateMaterials           = state => state.api.wyatt.material
const getStateStocks              = state => state.api.wyatt.stock
const getStateOrders              = state => state.api.wyatt.order

export const getSession = createSelector(
  [ getStateSessions, getStateResources ],
  (sessions, resources) => {
    if(sessions.length < 1) return
    const sessionUuid = sessions[0]
    return resources[sessionUuid]
  }
)

export const getModels = createSelector(
  [ getStateModels, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getMemberships = createSelector(
  [ getStateMemberships, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getSessions = createSelector(
  [ getStateSessions, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getUsers = createSelector(
  [ getStateUsers, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getLocations = createSelector(
  [ getStateLocations, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getPostProcessorTypes = createSelector(
  [ getStatePostProcessorTypes, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getPostProcessors = createSelector(
  [ getStatePostProcessors, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getManufacturers = createSelector(
  [ getStateManufacturers, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getMaterials = createSelector(
  [ getStateMaterials, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getStocks = createSelector(
  [ getStateStocks, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getOrders = createSelector(
  [ getStateOrders, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)
