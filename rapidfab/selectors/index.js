import _                  from "lodash"
import { createSelector } from 'reselect'
import { extractUuid }    from 'rapidfab/reducers/makeApiReducers'

export const getStateResources           = state => state.resources
export const getRoute                    = (state, props) => props.route

export const getStateModels              = state => state.api.hoth.model
export const getStateMemberships         = state => state.api.pao.memberships
export const getStateSessions            = state => state.api.pao.sessions
export const getStateUsers               = state => state.api.pao.users
export const getStateLocations           = state => state.api.wyatt.location
export const getStatePostProcessorTypes  = state => state.api.wyatt['post-processor-type']
export const getStatePostProcessors      = state => state.api.wyatt['post-processor']
export const getStateManufacturers       = state => state.api.wyatt.manufacturer
export const getStateMaterials           = state => state.api.wyatt.material
export const getStateStocks              = state => state.api.wyatt.stock
export const getStateOrders              = state => state.api.wyatt.order
export const getStatePrints              = state => state.api.wyatt.print
export const getStatePrinters            = state => state.api.wyatt.printer
export const getStateRuns                = state => state.api.wyatt.run
export const getStateUploadModel         = state => state.uploadModel

export const getResourceErrors         = (state, path) => {
  const methods = _.get(state.ui, path)
  if(!methods) {
    throw new Error(`Could not find methods by path: ${path}`)
  }
  return _.concat(
    methods.list.errors,
    methods.get.errors,
    methods.post.errors,
    methods.put.errors,
    methods.delete.errors
  )
}

export const getResourceFetching         = (state, path) => {
  const methods = _.get(state.ui, path)
  if(!methods) {
    throw new Error(`Could not find methods by path: ${path}`)
  }
  return !!_.find(methods, method => method.fetching)
}

export const getRouteResource = createSelector(
  [ getRoute, getStateResources ],
  (route, resources) => resources[route.uuid]
)

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

export const getPrinters = createSelector(
  [ getStatePrinters, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getUploadModel = createSelector(
  [ getStateUploadModel ],
  uploadModel => uploadModel
)

export const getPrints = createSelector(
  [ getStatePrints, getStateResources, getStateOrders ],
  (uuids, resources) => _.map(uuids, uuid => {
    let print = resources[uuid]
    let order = resources[extractUuid(print.order)]
    order.materials.base = resources[extractUuid(order.materials.base)]
    order.materials.support = resources[extractUuid(order.materials.support)]
    print.order = order
    return print
  })
)

export const getPrintsCreated = createSelector(
  [ getStatePrints, getStateResources ],
  (uuids, resources) => {
    const prints = _.map(uuids, uuid => resources[uuid])
    return _.filter(prints, ['status', 'created'])
  }
)

export const getRuns = createSelector(
  [ getStateRuns, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)
