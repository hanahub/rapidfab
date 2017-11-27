import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import extractUuid from 'rapidfab/utils/extractUuid';
import { getRouteUUID, getRouteUUIDResource } from 'rapidfab/selectors';

import RunRecordForm from 'rapidfab/components/records/run/RunRecordForm';

class RunRecordFormContainer extends React.Component {
  constructor(props) {
    super(props);

    const {
      initialNotes,
      initialStatus,
      model,
      postProcessor,
      printerType,
      printer,
    } = this.props;

    this.state = {
      notes: initialNotes || null,
      status: initialStatus || null,
    };

    this.handleFetchAssociatedResources({
      model,
      postProcessor,
      printerType,
      printer,
    });

    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetching && !nextProps.isFetching) {
      const {
        initialNotes,
        initialStatus,
        model,
        postProcessor,
        printerType,
        printer,
      } = nextProps;
      this.setState({
        notes: initialNotes,
        status: initialStatus,
      });
      this.handleFetchAssociatedResources({
        model,
        postProcessor,
        printerType,
        printer,
      });
    }
  }

  handleDelete() {
    this.props
      .dispatch(Actions.Api.wyatt.run.delete(this.props.uuid))
      .then(() => {
        window.location.hash = '#/plan/runs';
      });
  }

  handleFetchAssociatedResources(resources) {
    const { dispatch } = this.props;
    if (resources.model) {
      dispatch(Actions.Api.hoth.model.get(extractUuid(resources.model)));
    }
    if (resources.postProcessor) {
      dispatch(
        Actions.Api.wyatt['post-processor'].get(
          extractUuid(resources.postProcessor)
        )
      );
    }
    if (resources.printer) {
      dispatch(Actions.Api.wyatt.printer.get(extractUuid(resources.printer)));
    }
    if (resources.printerType) {
      dispatch(
        Actions.Api.wyatt['printer-type'].get(
          extractUuid(resources.printerType)
        )
      );
    }
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { notes, status } = this.state;
    const payload = Object.assign(
      {},
      { notes },
      status !== this.props.initialStatus ? { status } : null
    );
    this.props.dispatch(Actions.Api.wyatt.run.put(this.props.uuid, payload));
  }

  render() {
    return (
      <RunRecordForm
        {...this.state}
        {...this.props}
        handleDelete={this.handleDelete}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

RunRecordFormContainer.defaultProps = {
  initialNotes: null,
  initialStatus: null,
  model: null,
  postProcessor: null,
  printer: null,
  printerType: null,
  uuid: null,
};

RunRecordFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialNotes: PropTypes.string,
  initialStatus: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  model: PropTypes.string,
  postProcessor: PropTypes.string,
  printer: PropTypes.string,
  printerType: PropTypes.string,
  uuid: PropTypes.string,
};

const mapStateToProps = state => {
  const uuid = getRouteUUID(state);
  const run = getRouteUUIDResource(state);
  return Object.assign(
    {
      isFetching: state.ui.wyatt.run.get.fetching,
      isSaving: state.ui.wyatt.run.put.fetching,
      uuid,
    },
    run
      ? {
          created: run.created,
          initialNotes: run.notes,
          initialStatus: run.status,
          model: run.model,
          modelName: state.resources[extractUuid(run.model)]
            ? state.resources[extractUuid(run.model)].name
            : null,
          postProcessor: run.post_processor,
          postProcessorName: state.resources[extractUuid(run.post_processor)]
            ? state.resources[extractUuid(run.post_processor)].name
            : null,
          printerType: run.printer_type,
          printerTypeName: state.resources[extractUuid(run.printer_type)]
            ? state.resources[extractUuid(run.printer_type)].name
            : null,
          printer: run.printer,
          printerName: state.resources[extractUuid(run.printer)]
            ? state.resources[extractUuid(run.printer)].name
            : null,
        }
      : null
  );
};

export default connect(mapStateToProps)(RunRecordFormContainer);
