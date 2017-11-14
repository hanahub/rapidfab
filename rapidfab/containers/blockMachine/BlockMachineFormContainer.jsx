import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Actions from 'rapidfab/actions';

import BlockMachineForm from 'rapidfab/components/blockMachine/BlockMachineForm';

class BlockMachineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.initialValues ? props.initialValues.description : '',
      finishDate: props.initialValues
        ? props.initialValues.finishDate
        : moment()
            .add(1, 'd')
            .add(2, 'h')
            .format('YYYY-MM-DD'),
      finishTime: props.initialValues
        ? props.initialValues.finishTime
        : moment()
            .add(1, 'd')
            .add(2, 'h')
            .format('MM:ss'),
      startDate: props.initialValues
        ? props.initialValues.startDate
        : moment()
            .add(1, 'd')
            .add(2, 'h')
            .format('YYYY-MM-DD'),
      startTime: props.initialValues
        ? props.initialValues.startTime
        : moment()
            .add(1, 'd')
            .add(1, 'h')
            .format('MM:ss'),
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.downtime !== this.props.downtime && nextProps.initialValues) {
      this.setState({
        description: nextProps.initialValues.description,
        finishDate: nextProps.initialValues.finishDate,
        finishTime: nextProps.initialValues.finishTime,
        startDate: nextProps.initialValues.startDate,
        startTime: nextProps.initialValues.startTime,
      });
    }
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      dispatch,
      downtime,
      machineType,
      machineUri,
      handleSelectionChange,
      initialValues,
    } = this.props;
    const { finishDate, finishTime, startDate, startTime } = this.state;
    const payload = {
      description: this.state.description,
      [machineType]: machineUri,
      finish: moment(`${finishDate} ${finishTime}`).toISOString(),
      start: moment(`${startDate} ${startTime}`).toISOString(),
    };
    const response = await (initialValues
      ? dispatch(Actions.Api.wyatt['block-machine'].put(downtime, payload))
      : dispatch(Actions.Api.wyatt['block-machine'].post(payload)));
    if (
      response.type === 'RESOURCE_POST_SUCCESS' ||
      response.type === 'RESOURCE_PUT_SUCCESS'
    ) {
      handleSelectionChange('none');
    }
  }

  render() {
    const { handleInputChange, handleSubmit } = this;
    return (
      <BlockMachineForm
        {...this.state}
        {...this.props}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

BlockMachineFormContainer.defaultProps = {
  downtime: null,
  initialValues: null,
};

BlockMachineFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  downtime: PropTypes.string,
  handleSelectionChange: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    description: PropTypes.string,
    finishDate: PropTypes.string,
    finishTime: PropTypes.string,
    startDate: PropTypes.string,
    startTime: PropTypes.string,
  }),
  machineType: PropTypes.oneOf(['post_processor', 'printer']).isRequired,
  machineUri: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  initialValues:
    ownProps.downtime && state.resources[ownProps.downtime]
      ? {
          description: state.resources[ownProps.downtime].description,
          finishDate: moment(state.resources[ownProps.downtime].finish).format(
            'YYYY-MM-DD'
          ),
          finishTime: moment(state.resources[ownProps.downtime].finish).format(
            'HH:ss'
          ),
          startDate: moment(state.resources[ownProps.downtime].start).format(
            'YYYY-MM-DD'
          ),
          startTime: moment(state.resources[ownProps.downtime].start).format(
            'HH:ss'
          ),
        }
      : null,
});

export default connect(mapStateToProps)(BlockMachineFormContainer);
