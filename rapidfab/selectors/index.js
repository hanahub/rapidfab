import _                  from "lodash"
import { createSelector } from 'reselect'
import { extractUuid }    from 'rapidfab/reducers/makeApiReducers'
import moment             from 'moment'

export const getStateResources           = state => state.resources
export const getRoute                    = (state, props) => props.route
export const getPredicate                = (state, predicate) => predicate

export const getStateModels              = state => state.api.hoth.model
export const getStateMemberships         = state => state.api.pao.memberships
export const getStateSessions            = state => state.api.pao.sessions
export const getStateUsers               = state => state.api.pao.users
export const getStateLocations           = state => state.api.wyatt.location
export const getStatePostProcessorTypes  = state => state.api.wyatt['post-processor-type']
export const getStatePostProcessors      = state => state.api.wyatt['post-processor']
export const getStateManufacturers       = state => state.api.wyatt.manufacturer
export const getStateShippings           = state => state.api.wyatt.shipping
export const getStateConversions         = state => state.api.wyatt["currency-conversion"]
export const getStateMaterials           = state => state.api.wyatt.material
export const getStateStocks              = state => state.api.wyatt.stock
export const getStateOrders              = state => state.api.wyatt.order
export const getStatePrints              = state => state.api.wyatt.print
export const getStatePrinters            = state => state.api.wyatt.printer
export const getStatePrinterTypes        = state => state.api.wyatt['printer-type']
export const getStateRuns                = state => state.api.wyatt.run
export const getStateThirdPartyProviders = state => state.api.wyatt['third-party']
export const getStateUploadModel         = state => state.uploadModel

export const getResourceByUuid = createSelector(
  [ (state, uuid) => { uuid }, getStateResources ],
  (predicate, resources) => _.find(resources, predicate)
)

export const getResource = createSelector(
  [ getPredicate, getStateResources ],
  (predicate, resources) => _.find(resources, predicate)
)

export const getResourcesByFilter = createSelector(
  [ getPredicate, getStateResources ],
  (filters, resources) => _.uniqBy(_.reduce(filters, (result, filter) => {
    return _.concat(result, _.filter(resources, filter))
  }, []), 'uri')
)

export const getResourceErrors = (state, path) => {
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

export const getResourceFetching = (state, path) => {
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

export const getShippings = createSelector(
  [ getStateShippings, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getConversions = createSelector(
  [ getStateConversions, getStateResources ],
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

export const getPrinterTypes = createSelector(
  [ getStatePrinterTypes, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getPrints = createSelector(
  [ getStatePrints, getStateResources, getStateOrders ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getPrintsForOrder = createSelector(
  [ getPredicate, getStatePrints, getStateResources ],
  (order, uuids, resources) => {
    const prints = _.reduce(uuids, (results, uuid) => {
      const print = resources[uuid];
      if(print && order && print.order == order.uri) {
        results.push(print);
      }
      return results;
    }, []);
    return prints;
  }
);

export const getRunsForOrder = createSelector(
  [ getPredicate, getStateResources, getPrintsForOrder ],
  (order, resources, prints) => {
    const runs = _.reduce(prints, (results, print) => {
      if(!print.run) return results;
      const runUUID = extractUuid(print.run);
      const run = resources[runUUID];
      if(run) {
        results.push(run);
      }
      return results;
    }, []);
    return runs;
  }
);

export const getPrintsForRun = createSelector(
  [ getPredicate, getStateResources, getPrints ],
  (run, resources, prints) => {
    const runs = _.reduce(prints, (results, print) => {
      if(run && print.run == run.uri) {
        results.push(print);
      }
      return results;
    }, []);
    return runs;
  }
);

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

export const getPrintersForRunNew = createSelector(
  [ getPrinters, getPrinterTypes ],
  (printers, printerTypes) => {
    if(printers.length && printerTypes.length) {
      return _.reduce(printers, (result, printer) => {
        const printerType = _.find(printerTypes, ['uri', printer.printer_type])
        if(printerType) {
          let hydratedRecord = _.assign({}, printer, {
            printer_type: printerType
          })
          result.push(hydratedRecord)
        }
        return result
      }, [])
    }
    return []
  }
)

export const getOrdersForRunNew = createSelector(
  [ getOrders, getMaterials, getPrintsCreated, getModels ],
  (orders, materials, prints, models) => {
    if(orders.length && materials.length && prints.length && models.length) {
      return _.reduce(orders, (result, order) => {
        const baseMaterial    = _.find(materials, ['uri', order.materials.base])
        const supportMaterial = _.find(materials, ['uri', order.materials.support])
        const model           = _.find(models, ['uri', order.model])
        const orderPrints     = _.filter(prints, ['order', order.uri])
        if(baseMaterial && model && orderPrints.length && order.status == 'confirmed' || order.status == 'printing') {
          let hydratedRecord = _.assign({}, order, {
            materials: {
              base    : baseMaterial,
              support : supportMaterial
            },
            model
          })
          hydratedRecord.prints = _.map(orderPrints, print => _.assign({}, print, { order: hydratedRecord }))
          result.push(hydratedRecord)
        }
        return result
      }, [])
    }
    return []
  }
)

export const getThirdPartyProviders = createSelector(
  [ getStateThirdPartyProviders, getStateResources ],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
)

export const getResourcesForQueues = createSelector(
  [ getPrinters, getPostProcessors, getRuns ],
  (printers, postProcessors, runs) => {
    if(!printers.length || !postProcessors.length || !runs.length) return []
    const resources = _.concat(printers, postProcessors)
    return _.sortBy(_.reduce(resources, (result, resource) => {
      const queueRuns = _.reduce(resource.queue, (runResult, runUri) => {
        const run = _.find(runs, ['uri', runUri])
        if(run) {
          runResult.push(run)
        }
        return runResult
      }, [])
      result.push(_.assign({}, resource, {
        queue: queueRuns
      }))
      return result
    }, []), 'name')
  }
)

export const getRunStatusChartData = createSelector(
  [ getRuns ],
  runs => {
    const groupedByStatus = _.assign({
      calculating: [],
      calculated: [],
      'post-processing': [],
      printing: [],
      queued: [],
      error: [],
      complete: []
    }, _.groupBy(runs, 'status'))
    return [
        groupedByStatus.calculating.length + groupedByStatus.calculated.length,
        groupedByStatus.queued.length,
        groupedByStatus.printing.length,
        groupedByStatus['post-processing'].length,
        groupedByStatus.error.length,
        groupedByStatus.complete.length
    ]
  }
)

export const getLastTenOrders = createSelector(
  [ getOrders ],
  orders => {
    return _.takeRight(_.sortBy(orders, order => {
      return moment(order.created).local()
    }), 10)
  }
)
