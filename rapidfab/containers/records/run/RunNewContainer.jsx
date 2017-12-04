import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import RunComponent from 'rapidfab/components/records/run/new';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import Loading from 'rapidfab/components/Loading';

const printsPerPage = 10;

class RunNewContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return this.props.loading ? <Loading /> : <RunComponent {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.wyatt.order.list({}));
      dispatch(
        Actions.Api.wyatt['line-item'].list({ bureau })
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
            Actions.Api.wyatt.print.list(
              {
                line_item: lineItemURIs,
              },
              true
            )
          );

          dispatch(
            Actions.Api.hoth.model.list(
              {
                uri: filteredModels,
              },
              true
            )
          );
        });
      });
      dispatch(Actions.Api.wyatt['process-step'].list());
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt.printer.list());
      dispatch(Actions.Api.wyatt.material.list({ bureau }));
      dispatch(Actions.Api.nautilus.modeler.list());
    },
    onSave: payload =>
      dispatch(Actions.Api.wyatt.run.post(payload)).then(args => {
        window.location.hash = `#/records/run/${extractUuid(
          args.headers.location
        )}`;
      }),
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
  const bureau = Selectors.getBureauUri(state);
  const fetching =
    state.ui.hoth.model.list.fetching ||
    state.ui.nautilus.modeler.list.fetching ||
    state.ui.wyatt['line-item'].list.fetching ||
    state.ui.wyatt.material.list.fetching ||
    state.ui.wyatt.order.list.fetching ||
    state.ui.wyatt.print.list.fetching ||
    state.ui.wyatt.printer.list.fetching ||
    state.ui.wyatt['printer-type'].list.fetching ||
    state.ui.wyatt['process-step'].list.fetching ||
    state.ui.wyatt.run.post.fetching;
  const lineItems = Selectors.getLineItemsForRunNew(state);
  const modelers = Selectors.getModelers(state);
  const orderNamesMap = Selectors.getOrderNamesByURI(state);
  const processSteps = Selectors.getProcessSteps(state);
  const printerTypes = Selectors.getPrinterTypes(state);
  const printers = Selectors.getPrintersForRunNew(state);

  const lineItemPrints = lineItems.reduce(
    (prints, lineItem) => [...prints, ...lineItem.prints],
    []
  );

  const printablePrints = lineItemPrints.filter(print => {
    if (!print.process_step) {
      console.warn(`No process step for ${print.uri}`);
      return false;
    }
    const processStep = processSteps.find(
      step => print.process_step === step.uri
    );
    if (!processStep) {
      console.warn(
        `Could not find process step ${print.process_step} in `,
        processSteps
      );
      return false;
    }

    if (
      processStep &&
      printerTypes.find(type => type.uri === processStep.process_type_uri)
    ) {
      return true;
    }
    console.warn(
      `Could not find a printer type ${processStep.process_type_uri} for process step ${processStep.uri}`
    );
    return false;

    return false;
  });

  const pager = getPager(state, printablePrints);
  const page = pager.activePage - 1;

  return {
    bureau,
    fetching,
    loading: (!lineItems.length || !printers.length) && fetching,
    lineItems,
    orderNamesMap,
    pager,
    printers,
    prints: printablePrints.splice(page * printsPerPage, printsPerPage),
    modelers,
  };
}

RunNewContainer.defaultProps = {
  uuid: null,
};

RunNewContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  uuid: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(RunNewContainer);
