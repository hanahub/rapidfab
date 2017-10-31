import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import RunPrintsEdit from 'rapidfab/components/records/run/RunPrintsEdit';
import * as Selectors from 'rapidfab/selectors';

import Loading from 'rapidfab/components/Loading';

const printsPerPage = 10;

class RunPrintsEditContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return this.props.loading ? <Loading /> : <RunPrintsEdit {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.wyatt.order.list({}));
      dispatch(
        Actions.Api.wyatt['line-item'].list({ bureau: bureau.uri })
      ).then(response => {
        const lineItems = response.json.resources;
        const printableLineItems = lineItems.filter(lineItem => {
          const { status } = lineItem;
          return status === 'confirmed' || status === 'printing';
        });

        _.chunk(printableLineItems, 15).forEach(lineItemChunk => {
          const lineItemURIs = lineItemChunk.map(lineItem => lineItem.uri);
          const lineItemModels = lineItemChunk.map(lineItem => lineItem.model);
          // remove null values
          const filteredModels = lineItemModels.filter(model => model);

          dispatch(
            Actions.Api.wyatt.print.list({
              line_item: lineItemURIs,
            })
          );

          dispatch(
            Actions.Api.hoth.model.list({
              uri: filteredModels,
            })
          );
        });
      });
      dispatch(Actions.Api.wyatt['process-step'].list());
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt.printer.list());
      dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
    },
    onSave: (uri, payload) => dispatch(Actions.Api.wyatt.run.put(uri, payload)),
    onPageChange: value => dispatch(Actions.Pager.setPage(value)),
    onUnmount: () => {
      dispatch(Actions.UI.clearUIState(['wyatt.run.post', 'wyatt.run.put']));
    },
  };
}

const getPager = (state, prints) => ({
  items: Math.ceil(prints.length / printsPerPage),
  activePage: state.pager.activePage,
});

function mapStateToProps(state) {
  const runResource = Selectors.getRouteUUIDResource(state);
  const printerType = state.ui.wyatt['printer-type'];
  const processStep = state.ui.wyatt['process-step'];
  const lineItem = state.ui.wyatt['line-item'];

  const { material, print, printer, run, order } = state.ui.wyatt;

  const { model } = state.ui.hoth;

  const { modeler } = state.ui.nautilus;

  const fetching =
    lineItem.list.fetching ||
    material.list.fetching ||
    print.list.fetching ||
    model.list.fetching ||
    run.post.fetching ||
    printerType.list.fetching ||
    printer.list.fetching ||
    processStep.list.fetching ||
    order.list.fetching;

  const bureau = Selectors.getBureau(state);
  const lineItems = Selectors.getLineItemsForRunEdit(state);
  const prints = _.flatMap(lineItems, 'prints');
  const processSteps = Selectors.getProcessSteps(state);
  const printerTypes = Selectors.getPrinterTypes(state);
  const orderNamesMap = Selectors.getOrderNamesByURI(state);

  const printablePrints = prints.filter(print => {
    if (!print.process_step) {
      return false;
    }
    const step = processSteps.find(step => print.process_step === step.uri);

    if (step && printerTypes.find(type => type.uri === step.process_type_uri)) {
      return true;
    }
    return false;
  });

  const activePrints = prints.filter(print =>
    runResource.prints.includes(print.uri)
  );

  const printers = Selectors.getPrintersForRunNew(state);
  const pager = getPager(state, printablePrints);

  const page = pager.activePage - 1;

  return {
    activePrints,
    bureau,
    fetching,
    loading: (!lineItems.length || !printers.length) && fetching,
    lineItems,
    orderNamesMap,
    pager,
    prints: printablePrints.splice(page * printsPerPage, printsPerPage),
    printers,
    runUri: runResource.uri,
  };
}

RunPrintsEditContainer.propTypes = {
  bureau: PropTypes.object,
  uuid: PropTypes.string,
  onInitialize: PropTypes.func,
  onUnmount: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RunPrintsEditContainer
);
