import _ from 'lodash';
import { createSelector } from 'reselect';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import moment from 'moment';

export const getStateResources = state => state.resources;
export const getRoute = (state, props) => props.route;
export const getRouteUUID = state => state.routeUUID;
export const getPredicate = (state, predicate) => predicate;

export const getStateModels = state => state.api.hoth.model;
export const getStateMemberships = state => state.api.pao.memberships;
export const getStateSessions = state => state.api.pao.sessions;
export const getStateUsers = state => state.api.pao.users;
export const getStatePermissions = state => state.api.pao.permissions;
export const getStateLocations = state => state.api.wyatt.location;
export const getStateProcessStep = state => state.api.wyatt['process-step'];
export const getStatePostProcessorTypes = state =>
  state.api.wyatt['post-processor-type'];
export const getStatePostProcessors = state =>
  state.api.wyatt['post-processor'];
export const getStateManufacturers = state => state.api.wyatt.manufacturer;
export const getStateShippings = state => state.api.wyatt.shipping;
export const getStateTemplates = state => state.api.wyatt.template;
export const getStateTraceabilityReport = state =>
  state.api.wyatt['traceability-report'];
export const getStateConversions = state =>
  state.api.wyatt['currency-conversion'];

export const getStateGroups = state => state.api.pao.groups;
export const getStateBureaus = state => state.api.wyatt.bureau;
export const getStateFeatures = state => state.api.wyatt.feature;
export const getStateEvents = state => state.api.wyatt.event;
export const getStateMaterials = state => state.api.wyatt.material;
export const getStateRoles = state => state.api.wyatt.role;
export const getStateStocks = state => state.api.wyatt.stock;
export const getStateOrders = state => state.api.wyatt.order;
export const getStateOrderDocuments = state =>
  state.api.wyatt['order-document'];
export const getStateLineItems = state => state.api.wyatt['line-item'];
export const getStateOrderLocations = state => state.orderLocation;
export const getStatePrints = state => state.api.wyatt.print;
export const getStatePrinters = state => state.api.wyatt.printer;
export const getStatePrinterTypes = state => state.api.wyatt['printer-type'];
export const getStateRuns = state => state.api.wyatt.run;
export const getStateRunDocuments = state => state.api.wyatt['run-document'];
export const getStateThirdPartyProviders = state =>
  state.api.wyatt['third-party'];
export const getStateModelers = state => state.api.nautilus.modeler;
export const getStateUploadModel = state => state.uploadModel;
export const getStateLocationFilter = state => state.locationFilter.location;
export const getStateDowntimes = state => state.api.wyatt.downtime;

export const getResourceByUuid = createSelector(
  [getPredicate, getStateResources],
  (predicate, resources) => _.find(resources, predicate)
);

export const getResource = createSelector(
  [getPredicate, getStateResources],
  (predicate, resources) => _.find(resources, predicate)
);

export const getResourcesByFilter = createSelector(
  [getPredicate, getStateResources],
  (filters, resources) =>
    _.uniqBy(
      _.reduce(
        filters,
        (result, filter) => _.concat(result, _.filter(resources, filter)),
        []
      ),
      'uri'
    )
);

export const getResourceErrors = (state, path) => {
  const methods = _.get(state.ui, path);
  if (!methods) {
    throw new Error(`Could not find methods by path: ${path}`);
  }
  return _.concat(
    methods.list.errors,
    methods.get.errors,
    methods.post.errors,
    methods.put.errors,
    methods.delete.errors
  );
};

export const getResourceFetching = (state, path) => {
  const methods = _.get(state.ui, path);
  if (!methods) {
    throw new Error(`Could not find methods by path: ${path}`);
  }
  return !!_.find(methods, method => method.fetching);
};

export const getRouteResource = createSelector(
  [getRoute, getStateResources],
  (route, resources) => resources[route.uuid]
);

export const getRouteUUIDResource = createSelector(
  [getRouteUUID, getStateResources],
  (routeUUID, resources) => resources[routeUUID]
);

export const getFeatures = createSelector(
  [getStateFeatures, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const isQuotingFeatureEnabled = createSelector([getFeatures], features =>
  features.find(feature => feature.name === 'quoting' && feature.enabled)
);

export const getSession = createSelector(
  [getStateSessions, getStateResources],
  (sessions, resources) => {
    if (sessions.length < 1) {
      return null;
    }
    const sessionUuid = sessions[0];
    return resources[sessionUuid];
  }
);

export const isSessionUser = createSelector(
  [getPredicate, getSession],
  (userUUID, session) => userUUID === session.uuid
);

export const getPermissions = createSelector(
  [getStatePermissions, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getGroups = createSelector(
  [getStateGroups, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getBureaus = createSelector(
  [getStateBureaus, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getModels = createSelector(
  [getStateModels, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getMemberships = createSelector(
  [getStateMemberships, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getRoles = createSelector(
  [getStateRoles, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getUserRoles = createSelector(
  [getPredicate, getRoles],
  (user, roles) =>
    roles.filter(
      role => role.username === (user.username ? user.username : user.email)
      // Check for username by default
      // but the username isn't stored on successful POST
      // so check the email as an alternative
    )
);

export const getRolesCurrentUser = createSelector(
  [getRoles, getSession],
  (roles, session) => {
    if (!session) {
      return [];
    }
    return roles.filter(
      role => (role.username === session.username ? session : false)
    );
  }
);

export const isCurrentUserRestricted = createSelector(
  [getRolesCurrentUser],
  roles => roles.every(role => role.role === 'restricted')
);

export const getBureausCurrentUserRoles = createSelector(
  [getRolesCurrentUser, getBureaus],
  (roles, bureaus) =>
    roles.reduce((accumulator, role) => {
      accumulator.add(bureaus.find(bureau => bureau.uri === role.bureau));
      return accumulator;
    }, new Set())
);

export const getBureau = createSelector(
  [getBureausCurrentUserRoles],
  bureaus => {
    if (!(bureaus && bureaus.size)) {
      return null;
    }
    return Array.from(bureaus)[0];
  }
);

export const getBureauUri = createSelector([getBureau], bureau => bureau.uri);

export const getInitialValuesBureau = createSelector(
  [getRoute, getStateResources, getBureau],
  (route, resources, bureau) => {
    const resource = resources[route.uuid] || {};
    if (!resource.bureau) {
      resource.bureau = bureau.uri;
    }
    return resource;
  }
);

export const getSessions = createSelector(
  [getStateSessions, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getUsers = createSelector(
  [getStateUsers, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getUsersByUri = createSelector([getUsers], users =>
  _.keyBy(users, 'uri')
);

export const getLocations = createSelector(
  [getStateLocations, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getLocationsByUri = createSelector([getLocations], locations =>
  _.keyBy(locations, 'uri')
);

export const getLocationOptions = createSelector([getLocations], locations =>
  locations.map(location => ({
    name: location.name,
    uri: location.uri,
  }))
);

export const getPostProcessorTypes = createSelector(
  [getStatePostProcessorTypes, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getPostProcessorTypesByUri = createSelector(
  [getPostProcessorTypes],
  postProcessorTypes => _.keyBy(postProcessorTypes, 'uri')
);

export const getPostProcessors = createSelector(
  [getStatePostProcessors, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getManufacturers = createSelector(
  [getStateManufacturers, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getShippings = createSelector(
  [getStateShippings, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getShippingsAlphabetized = createSelector(
  [getShippings],
  shippings =>
    shippings.sort((a, b) => {
      const firstName = a.name.toLowerCase();
      const secondName = b.name.toLowerCase();
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    })
);

export const getTemplates = createSelector(
  [getStateTemplates, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getTemplatesAlphabetized = createSelector(
  [getTemplates],
  templates =>
    templates.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    })
);

export const getTraceabilityReports = createSelector(
  [getStateTraceabilityReport, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getConversions = createSelector(
  [getStateConversions, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getMaterials = createSelector(
  [getStateMaterials, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getMaterialsAlphabetized = createSelector(
  [getMaterials],
  materials =>
    materials.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    })
);

export const getBaseAndSupportMaterials = createSelector(
  [getMaterialsAlphabetized],
  materials =>
    materials.reduce(
      (organized, material) =>
        Object.assign(
          {},
          organized,
          material.type === 'base'
            ? { base: [...organized.base, material] }
            : { support: [...organized.support, material] }
        ),
      { base: [], support: [] }
    )
);

export const getStocks = createSelector(
  [getStateStocks, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getOrders = createSelector(
  [getStateOrders, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getOrderNamesByURI = createSelector([getOrders], orders =>
  orders.reduce(
    (nameMap, order) => Object.assign({}, nameMap, { [order.uri]: order.name }),
    {}
  )
);

export const getOrderDocuments = createSelector(
  [getStateOrderDocuments, getStateResources],
  (uuids, resources) => uuids.map(uuid => resources[uuid])
);

export const getLineItems = createSelector(
  [getStateLineItems, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getOrderLocations = createSelector(
  [getStateOrderLocations, getStateResources],
  orderLocation => orderLocation
);

export const getPrinters = createSelector(
  [getStatePrinters, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getModelers = createSelector(
  [getStateModelers, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getModelersByUri = createSelector([getModelers], modelers =>
  _.keyBy(modelers, 'uri')
);

export const getUploadModel = createSelector(
  [getStateUploadModel],
  uploadModel => uploadModel
);

export const getLocationFilter = createSelector(
  [getStateLocationFilter],
  location => location
);

export const getPrinterTypes = createSelector(
  [getStatePrinterTypes, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getPrinterTypesByUri = createSelector(
  [getPrinterTypes],
  printerTypes => _.keyBy(printerTypes, 'uri')
);

export const getPrinterTypeOptions = createSelector(
  [getPrinterTypes],
  printerTypes =>
    printerTypes.map(printerType => ({
      name: printerType.name,
      uri: printerType.uri,
    }))
);

export const getProcessSteps = createSelector(
  [getStateProcessStep, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getTraceabilityReportForPrint = createSelector(
  [getPredicate, getTraceabilityReports],
  (print, reports) => {
    if (print) {
      return _.find(reports, { print: print.uri });
    }
    return null;
  }
);

export const getStepsForTemplate = createSelector(
  [getPredicate, getStateProcessStep, getStateResources],
  (template, uuids, resources) => {
    const steps = _.reduce(
      uuids,
      (results, uuid) => {
        const step = resources[uuid];
        if (
          step &&
          template &&
          step.template &&
          template.uri &&
          step.template === template.uri
        ) {
          results.push(step);
        }
        return results;
      },
      []
    );
    return _.sortBy(steps, ['step_position'], ['desc']);
  }
);

export const getPrints = createSelector(
  [getStatePrints, getStateResources, getStateOrders],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getPrintsWithNames = createSelector(
  [getPrints, getStateResources],
  (prints, resources) =>
    prints.map(print => {
      const order = resources[extractUuid(print.order)];
      const lineItem = resources[extractUuid(print.line_item)];
      const model = lineItem ? resources[extractUuid(lineItem.model)] : null;
      let name = extractUuid(print.uri);
      if (model && order) {
        const { quantity } = lineItem;
        const { copy } = print;
        name = `${order.name}[${model.name}] (${copy}/${quantity})`;
      }
      return Object.assign({}, print, { name });
    })
);

export const getPrintWithName = createSelector(
  [getPredicate, getPrintsWithNames],
  (uri, prints) => prints.find(print => print.uri === uri)
);

export const getPrintsForOrder = createSelector(
  [getPredicate, getStatePrints, getStateResources],
  (order, uuids, resources) => {
    const prints = _.reduce(
      uuids,
      (results, uuid) => {
        const print = resources[uuid];
        if (print && order && print.order === order.uri) {
          results.push(print);
        }
        return results;
      },
      []
    );
    return prints;
  }
);

export const getPrintsForLineItem = createSelector(
  [getPredicate, getStatePrints, getStateResources],
  (lineItem, uuids, resources) => {
    const prints = _.reduce(
      uuids,
      (results, uuid) => {
        const print = resources[uuid];
        if (print && lineItem && print.line_item === lineItem.uri) {
          results.push(print);
        }
        return results;
      },
      []
    );
    return prints;
  }
);

export const getEvents = createSelector(
  [getStateEvents, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getRuns = createSelector(
  [getStateRuns, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getRunDocuments = createSelector(
  [getStateRunDocuments, getStateResources],
  (uuids, resources) => uuids.map(uuid => resources[uuid])
);

export const getEventsForPrint = createSelector(
  [getPredicate, getPrints, getEvents, getOrderDocuments, getRunDocuments],
  (print, prints, events, orderDocuments, runDocuments) => {
    if (!print) return null;

    const relevantPrints = prints.filter(
      p => print.line_item === p.line_item && print.copy === p.copy
    );
    const printRuns = relevantPrints.map(p => p.run);
    const printOrderDocuments = orderDocuments.reduce(
      (docs, doc) => (doc.order === print.order ? [...docs, doc.uri] : docs),
      []
    );
    const printRunDocuments = runDocuments.reduce(
      (docs, doc) => (printRuns.includes(doc.run) ? [...docs, doc.uri] : docs),
      []
    );
    const uris = _.compact([
      print.order,
      print.line_item,
      ...printOrderDocuments,
      ...printRuns,
      ...printRunDocuments,
    ]);

    return events.filter(event => uris.includes(event.reference));
  }
);

export const getEventsForPrintSortedByCreated = createSelector(
  [getEventsForPrint],
  prints =>
    prints.sort((a, b) => {
      if (a.created > b.created) return 1;
      if (a.created < b.created) return -1;
      return 0;
    })
);

export const getRunsForOrder = createSelector(
  [getPredicate, getStateResources, getPrintsForOrder],
  (order, resources, prints) => {
    const runs = _.reduce(
      prints,
      (results, print) => {
        if (!print.run && !print.post_processor_run) {
          return results;
        }

        if (print.run) {
          const runUUID = extractUuid(print.run);
          const run = resources[runUUID];
          if (run) {
            results.push(run);
          }
        }
        if (print.post_processor_run) {
          const runUUID = extractUuid(print.post_processor_run);
          const run = resources[runUUID];
          if (run) {
            results.push(run);
          }
        }
        return results;
      },
      []
    );
    return runs;
  }
);

export const getPrintsForRun = createSelector(
  [getPredicate, getStateResources, getPrints],
  (run, resources, prints) => {
    const runs = _.reduce(
      prints,
      (results, print) => {
        if (
          run &&
          (print.run === run.uri || print.post_processor_run === run.uri)
        ) {
          results.push(print);
        }
        return results;
      },
      []
    );
    return runs;
  }
);

export const getPrintsCreated = createSelector(
  [getStatePrints, getStateResources],
  (uuids, resources) => {
    const prints = _.map(uuids, uuid => resources[uuid]);
    return _.filter(prints, ['status', 'created']);
  }
);

export const getDowntimes = createSelector(
  [getStateDowntimes, getStateResources],
  (uuids, resources) => uuids.map(uuid => resources[uuid])
);

export const getDowntimesForMachine = createSelector(
  [getPredicate, getDowntimes],
  (uri, downtimes) =>
    downtimes.filter(
      downtime =>
        downtime.printer === uri ||
        downtime.post_processor === uri ||
        downtime.shipping === uri
    )
);

export const getPrintersForRunNew = createSelector(
  [getPrinters, getPrinterTypes],
  (printers, printerTypes) => {
    if (printers.length && printerTypes.length) {
      return _.reduce(
        printers,
        (result, printer) => {
          const printerType = _.find(printerTypes, [
            'uri',
            printer.printer_type,
          ]);
          if (printerType) {
            const hydratedRecord = _.assign({}, printer, {
              printer_type: printerType,
            });
            result.push(hydratedRecord);
          }
          return result;
        },
        []
      );
    }
    return [];
  }
);

export const getLineItemsForRunNew = createSelector(
  [getLineItems, getMaterials, getPrintsCreated, getModels],
  (lineItems, materials, prints, models) => {
    if (
      lineItems.length &&
      materials.length &&
      prints.length &&
      models.length
    ) {
      return _.reduce(
        lineItems,
        (result, lineItem) => {
          const baseMaterial = materials.find(
            material => material.uri === lineItem.materials.base
          );
          const supportMaterial = materials.find(
            material => material.uri === lineItem.materials.support
          );
          const lineItemModel = models.find(
            model => model.uri === lineItem.model
          );
          const lineItemPrints = prints.filter(
            print => print.line_item === lineItem.uri
          );

          if (
            baseMaterial &&
            lineItemModel &&
            lineItemPrints.length &&
            (lineItem.status === 'confirmed' || lineItem.status === 'printing')
          ) {
            const hydratedRecord = Object.assign({}, lineItem, {
              materials: {
                base: baseMaterial,
                support: supportMaterial,
              },
              model: lineItemModel,
            });
            hydratedRecord.prints = lineItemPrints.map(print =>
              Object.assign({}, print, { lineItem: hydratedRecord })
            );
            result.push(hydratedRecord);
          }
          return result;
        },
        []
      );
    }
    return [];
  }
);

export const getLineItemsForRunEdit = createSelector(
  [
    getRouteUUIDResource,
    getLineItems,
    getMaterials,
    getModels,
    getStatePrints,
    getStateResources,
  ],
  (run, lineItems, materials, models, printUuids, resources) => {
    const printResources = printUuids.map(uuid => resources[uuid]);
    const prints = printResources.filter(
      print => print.status === 'created' || run.prints.includes(print.uri)
    );
    if (
      lineItems.length &&
      materials.length &&
      prints.length &&
      models.length
    ) {
      return _.reduce(
        lineItems,
        (result, lineItem) => {
          const baseMaterial = materials.find(
            material => material.uri === lineItem.materials.base
          );
          const lineItemModel = models.find(
            model => model.uri === lineItem.model
          );
          const lineItemPrints = prints.filter(
            print => print.line_item === lineItem.uri
          );

          if (
            baseMaterial &&
            lineItemModel &&
            lineItemPrints.length &&
            (lineItem.status === 'confirmed' || lineItem.status === 'printing')
          ) {
            const hydratedRecord = Object.assign({}, lineItem, {
              materials: {
                base: baseMaterial,
              },
              model: lineItemModel,
            });
            hydratedRecord.prints = lineItemPrints.map(print =>
              Object.assign({}, print, { lineItem: hydratedRecord })
            );
            result.push(hydratedRecord);
          }
          return result;
        },
        []
      );
    }
    return [];
  }
);

export const getThirdPartyProviders = createSelector(
  [getStateThirdPartyProviders, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getMachinesForQueues = createSelector(
  [getPrinters, getPostProcessors, getModelers],
  (printers, postProcessors, modelers) =>
    _.map(_.concat(printers, postProcessors), machine => {
      const modeler = _.find(modelers, ['uri', machine.modeler]);
      return Object.assign({}, machine, {
        status: modeler ? modeler.status : 'unknown',
      });
    })
);

export const getLastTenOrders = createSelector([getOrders], orders =>
  _.takeRight(_.sortBy(orders, order => moment(order.created).local()), 10)
);

export function getRunStatusChart(runs) {
  const groupedByStatus = _.assign(
    {
      calculating: [],
      calculated: [],
      'in-progress': [],
      queued: [],
      error: [],
      complete: [],
    },
    _.groupBy(runs, 'status')
  );
  return [
    groupedByStatus.calculating.length + groupedByStatus.calculated.length,
    groupedByStatus.queued.length,
    groupedByStatus['in-progress'].length,
    groupedByStatus.error.length,
    groupedByStatus.complete.length,
  ];
}

export const getRunStatusChartData = createSelector([getRuns], runs =>
  getRunStatusChart(runs)
);

export const isSessionManager = createSelector(
  [getSession, getRoles, getBureau],
  (session, roles, bureau) =>
    roles.some(
      role =>
        role.username === session.username &&
        role.bureau === bureau.uri &&
        role.role === 'manager'
    )
);

export const getRunPrintsGridData = createSelector(
  [getRouteUUIDResource, getOrders, getPrints],
  (run, orders, prints) => {
    if (!run) return [];
    return prints
      .filter(
        print => print.run === run.uri || print.post_processor_run === run.uri
      )
      .map(print => {
        const printOrder = orders.find(order => order.uri === print.order);
        if (!printOrder) return {};
        const { id, order, uuid } = print;
        const { customer_name: customerName, due_date: dueDate } = printOrder;
        return { id, order, dueDate, customerName, uuid };
      });
  }
);

const QUEUE_EVENT_COLOR_MAP = {
  calculating: '#e4d836',
  calculated: '#9f86ff',
  queued: '#9f86ff',
  printing: '#1ca8dd',
  post_processing: '#e4d836',
  complete: '#1bc98e',
  error: '#e64759',
};

export const getQueueEvents = createSelector(
  [getRuns, getDowntimes, getLocationFilter],
  (runs, downtimes, locationFilter) => [
    ...runs.reduce(
      (events, run) =>
        (locationFilter ? locationFilter === run.location : true) &&
        (run.actuals.start || run.estimates.start) &&
        (run.actuals.end || run.estimates.end)
          ? [
              ...events,
              {
                id: run.uri,
                resourceId: run.printer || run.post_processor,
                title: run.id,
                url: `#/records/run/${run.uuid}`,
                start: run.actuals.start || run.estimates.start,
                end: run.actuals.end || run.estimates.end,
                backgroundColor: QUEUE_EVENT_COLOR_MAP[run.status],
                borderColor: QUEUE_EVENT_COLOR_MAP[run.status],
              },
            ]
          : events,
      []
    ),
    ...downtimes.map(downtime => ({
      id: downtime.uri,
      resourceId:
        downtime.printer || downtime.post_processor || downtime.shipping,
      title: downtime.description,
      start: downtime.start,
      end: downtime.finish,
      backgroundColor: '#FFA500',
      borderColor: '#FFA500',
    })),
  ]
);

export const getProcessStepsForPrint = createSelector(
  [getPredicate, getLineItems, getPrints, getProcessSteps, getStateResources],
  (routePrint, lineItems, prints, processSteps, stateResources) => {
    const lineItem = lineItems.find(li => li.uri === routePrint.line_item);
    if (!lineItem) {
      return [];
    }
    const lineItemPrints = prints.filter(
      print => print.line_item === lineItem.uri
    );
    const filteredProcessSteps = lineItemPrints.reduce(
      (printProcessSteps, print) => {
        if (print.copy !== routePrint.copy) {
          return printProcessSteps;
        }
        const processStep = processSteps.find(
          pstep => pstep.uri === print.process_step
        );
        return [
          ...printProcessSteps,
          Object.assign({}, print, {
            process_step: Object.assign({}, processStep, {
              process_type: processStep
                ? stateResources[extractUuid(processStep.process_type_uri)]
                : null,
            }),
          }),
        ];
      },
      []
    );
    return filteredProcessSteps.sort((a, b) => {
      if (a.process_step_position > b.process_step_position) {
        return 1;
      } else if (a.process_step_position < b.process_step_position) {
        return -1;
      }
      return 0;
    });
  }
);

export const getRunRescheduleQueue = createSelector(
  [getRouteUUIDResource, getPrinters, getRuns],
  ({ printer: printerUri }, printers, runs) => {
    const runPrinter = printers.find(printer => printer.uri === printerUri);
    return runPrinter
      ? runPrinter.queue.reduce((queue, runUri) => {
          const queueRun = runs.find(run => run.uri === runUri);
          return queueRun ? [...queue, queueRun] : queue;
        }, [])
      : [];
  }
);

export const getOrderMaterialUsedEstimate = createSelector(
  [getPredicate, getOrders, getLineItems, getModels],
  (orderUri, orders, lineItems, models) => {
    const order = orders.find(o => o.uri === orderUri);
    const orderLineItems = lineItems.filter(lineItem =>
      order.line_items.includes(lineItem.uri)
    );
    const lineItemModelUris = lineItems.map(lineItem => lineItem.model);
    const orderModels = models.filter(model =>
      lineItemModelUris.includes(model.uri)
    );
    return orderModels.reduce((totalEstimate, model) => {
      const modelVolume = model.volume_mm / 1000.0;
      const { quantity: lineItemQuantity } = orderLineItems.find(
        lineItem => lineItem.model === model.uri
      ) || { quantity: 0 };
      const estimate = modelVolume * lineItemQuantity;
      return totalEstimate + estimate;
    }, 0);
  }
);
