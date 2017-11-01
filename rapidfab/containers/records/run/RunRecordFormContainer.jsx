import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getRouteUUID, getRouteUUIDResource } from 'rapidfab/selectors';

import RunRecordForm from 'rapidfab/components/records/run/RunRecordForm';

class RunRecordFormContainer extends React.Component {
  constructor(props) {
    super(props);

    const { initialNotes, initialStatus } = this.props;
    this.state = {
      notes: initialNotes || null,
      status: initialStatus || null,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFetching && !this.props.isFetching) {
      const { initialNotes, initialStatus } = this.props;
      this.setState({
        notes: initialNotes,
        status: initialStatus,
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
  uuid: null,
};

RunRecordFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialNotes: PropTypes.string,
  initialStatus: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
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
          postProcessor: run.post_processor,
          printerType: run.printer_type,
          printer: run.printer,
          model: run.model,
        }
      : null
  );
};

export default connect(mapStateToProps)(RunRecordFormContainer);
