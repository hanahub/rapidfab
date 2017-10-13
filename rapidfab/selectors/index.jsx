import _ from 'lodash';
import { createSelector } from 'reselect';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import moment from 'moment';

export const getStateResources = state => state.resources;
export const getRoute = (state, props) => props.route;
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
export const getStateThirdPartyProviders = state =>
  state.api.wyatt['third-party'];
export const getStateModelers = state => state.api.nautilus.modeler;
export const getStateUploadModel = state => state.uploadModel;
export const getStateLocationFilter = state => state.locationFilter.location;

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

export const getFeatures = createSelector(
  [getStateFeatures, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
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
      role => (role.username == session.username ? session : false)
    );
  }
);

export const getBureausCurrentUserRoles = createSelector(
  [getRolesCurrentUser, getBureaus],
  (roles, bureaus) =>
    roles.reduce((accumulator, role) => {
      accumulator.add(bureaus.find(bureau => bureau.uri == role.bureau));
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

export const getBureauURI = createSelector([getBureau], bureau => bureau.uri);

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

export const getLocations = createSelector(
  [getStateLocations, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
);

export const getPostProcessorTypes = createSelector(
  [getStatePostProcessorTypes, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
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

export const getTemplates = createSelector(
  [getStateTemplates, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
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

export const getEventsForPrint = createSelector(
  [getPredicate, getPrints, getEvents],
  (print, prints, events) => {
    if (print) {
      const relevantPrints = _.filter(
        prints,
        p => print.line_item === p.line_item
      );

      const uris = _.compact([
        print.order,
        print.line_item,
        ..._.filter(_.map(relevantPrints, p => p.run)),
      ]);

      return _.filter(events, event => _.includes(uris, event.reference));
    }
    return null;
  }
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

export const getRuns = createSelector(
  [getStateRuns, getStateResources],
  (uuids, resources) => _.map(uuids, uuid => resources[uuid])
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
          const model = models.find(model => model.uri === lineItem.model);
          const lineItemPrints = prints.filter(
            print => print.line_item === lineItem.uri
          );

          if (
            baseMaterial &&
            model &&
            lineItemPrints.length &&
            (lineItem.status === 'confirmed' || lineItem.status === 'printing')
          ) {
            const hydratedRecord = Object.assign({}, lineItem, {
              materials: {
                base: baseMaterial,
                support: supportMaterial,
              },
              model,
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
