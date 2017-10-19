import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import RunEdit from 'rapidfab/components/records/run/RunEdit';

const fields = [
  'actuals.end',
  'actuals.materials.base',
  'actuals.materials.support',
  'actuals.start',
  'actuals.time.print',
  'actuals.time.post_processing',
  'created',
  'estimates.end',
  'estimates.materials.base',
  'estimates.materials.support',
  'estimates.start',
  'estimates.time.print',
  'estimates.time.post_processing',
  'id',
  'model',
  'notes',
  'post_processor',
  'printer',
  'printer_type',
  'status',
  'success',
  'tracking_number',
  'upload',
  'uri',
  'uuid',
];

class RunEditContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <RunEdit {...this.props} />;
  }
}

RunEditContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: props => {
      dispatch(Actions.Api.wyatt.run.get(props.route.uuid));
      dispatch(Actions.Api.wyatt.print.list());
      dispatch(Actions.Api.wyatt.order.list());
      dispatch(Actions.Api.wyatt['post-processor'].list());
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt.printer.list());
    },
    onDelete: uuid =>
      dispatch(Actions.Api.wyatt.run.delete(uuid))
        .then( () => { window.location.hash = '#/plan/runs' }
      ),
    onModelDownload: (runUUID, modelURI) => {
      dispatch(Actions.DownloadModel.fetchModel(modelURI)).then(response => {
        dispatch(
          Actions.DownloadModel.downloadContent(
            `${runUUID}.stl`,
            response.json.content
          )
        );
      });
    },
    onRequeue: runURI => {
      dispatch(
        Actions.Api.wyatt['run-queue'].post({ run: runURI })
      ).then(response => {
        dispatch(Actions.Api.wyatt.run.list());
      });
    },
    onUnmount: () => {
      dispatch(Actions.UI.clearUIState(['wyatt.run.post', 'wyatt.run.put']));
    },
  };
}

function mapStateToProps(state, props) {
  const downloadModel = state.downloadModel;
  const runResource = Selectors.getRouteResource(state, props);
  const orders = Selectors.getOrders(state);
  const prints = Selectors.getPrintsForRun(state, runResource);
  const postProcessors = Selectors.getPostProcessors(state);
  const printerTypes = Selectors.getPrinterTypes(state);
  const printers = Selectors.getPrinters(state);

  const initialStatus = state.form['record.run']
    ? state.form['record.run'].status.initial
    : null;

  const gridData = prints.map(print => {
    if (orders && prints) {
      const printOrder = orders.find(order => order.uri === print.order);
      const { id, order, uuid } = print;
      const dueDate = printOrder.due_date;
      const customerName = printOrder.customer_name;
      return { id, order, dueDate, customerName, uuid };
    }
    return {};
  });

  return {
    downloadModel,
    gridData,
    initialValues: runResource,
    orders,
    initialStatus,
    postProcessors,
    printerTypes,
    printers,
    statuses: [
      'calculating',
      'calculated',
      'queued',
      'in-progress',
      'complete',
      'error',
    ],
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const props = Object.assign(stateProps, dispatchProps, ownProps);
  props.onSubmit = run => {
    const payload = {
      notes: run.notes,
      success: run.success === 'success',
      status: run.status,
    };
    if (props.initialStatus === run.status) {
      delete payload.status;
    }
    props
      .dispatch(Actions.Api.wyatt.run.put(run.uuid, payload))
      .then(() => (window.location.hash = '#/plan/runs'));
  };
  return props;
}

export default reduxForm(
  {
    form: 'record.run',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RunEditContainer);
