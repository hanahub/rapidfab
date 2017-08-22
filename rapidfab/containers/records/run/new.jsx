import _ from 'lodash';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import RunComponent from 'rapidfab/components/records/run/new';
import * as Selectors from 'rapidfab/selectors';
import Fa from 'react-fontawesome';
import * as BS from 'react-bootstrap';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

const printsPerPage = 10;

const Loading = ({}) =>
  <BS.Row>
    <BS.Col xs={12}>
      <div style={{ textAlign: 'center' }}>
        <Fa name="spinner" spin size="2x" />
      </div>
    </BS.Col>
  </BS.Row>;

class RunContainer extends Component {
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
        Actions.Api.wyatt['line-item'].list({ bureau: bureau.uri })
      ).then(response => {
        const lineItems = response.json.resources;
        const printableLineItems = lineItems.filter(lineItem => {
          const { status } = lineItem;
          return status === 'confirmed' || status === 'printing';
        });

        for (const lineItems of _.chunk(printableLineItems, 15)) {
          const lineItemURIs = lineItems.map(lineItem => lineItem.uri);
          const lineItemModels = lineItems.map(lineItem => lineItem.model);
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

        }
      });
      dispatch(Actions.Api.wyatt['process-step'].list());
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt.printer.list());
      dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.nautilus.modeler.list());
    },
    onSave: payload =>
      dispatch(Actions.Api.wyatt.run.post(payload))
        .then(args => {
          window.location.hash = `#/records/run/${extractUuid(
            args.headers.location
          )}`;
        })
        .catch(error => {
          console.error('Failed to POST run', error);
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
    printer.list.fetching ||
    model.list.fetching ||
    modeler.list.fetching ||
    run.post.fetching ||
    printerType.list.fetching ||
    processStep.list.fetching ||
    order.list.fetching;

  const apiErrors = _.concat(
    order.list.errors,
    material.list.errors,
    lineItem.list.errors,
    print.list.errors,
    printer.list.errors,
    run.post.errors,
    model.list.errors,
    modeler.list.errors,
    printerType.list.errors,
    processStep.list.errors
  );

  const bureau = Selectors.getBureau(state);
  const lineItems = Selectors.getLineItemsForRunNew(state);
  const prints = _.flatMap(lineItems, 'prints');
  const processSteps = Selectors.getProcessSteps(state);
  const printerTypes = Selectors.getPrinterTypes(state);
  const orderNamesMap = Selectors.getOrderNamesByURI(state);

  const printablePrints = _.filter(prints, print => {
    if (!print.process_step) {
      return;
    }
    const step = _.find(processSteps, step => print.process_step === step.uri);

    if (
      step &&
      _.find(printerTypes, type => type.uri === step.process_type_uri)
    ) {
      return print;
    }
  });

  const pager = getPager(state, printablePrints);
  const printers = Selectors.getPrintersForRunNew(state);
  const modelers = Selectors.getModelers(state);

  const page = pager.activePage - 1;

  return {
    bureau,
    apiErrors,
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

export default connect(mapStateToProps, mapDispatchToProps)(RunContainer);
