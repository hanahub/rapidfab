import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import BlockMachineForm from 'rapidfab/components/blockMachine/BlockMachineForm';

class BlockMachineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.initialValues ? props.initialValues.description : '',
      finish: props.initialValues ? props.initialValues.finish : '',
      start: props.initialValues ? props.initialValues.start : '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.downtime !== this.props.downtime && nextProps.initialValues) {
      this.setState({
        description: nextProps.initialValues.description,
        finish: nextProps.initialValues.finish,
        start: nextProps.initialValues.start,
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
    const payload = {
      description: this.state.description,
      [machineType]: machineUri,
      finish: this.state.finish,
      start: this.state.start,
    };
    const response = await (initialValues
      ? dispatch(Actions.Api.wyatt['block-machine'].put(downtime, payload))
      : dispatch(Actions.Api.wyatt['block-machine'].post(payload)));
    if (response.type === 'RESOURCE_POST_SUCCESS' || response.type === 'RESOURCE_PUT_SUCCESS') {
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
    finish: PropTypes.string,
    start: PropTypes.string,
  }),
  machineType: PropTypes.oneOf(['post_processor', 'printer']).isRequired,
  machineUri: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  initialValues:
    ownProps.downtime && state.resources[ownProps.downtime]
      ? {
          description: state.resources[ownProps.downtime].description,
          finish: new Date(state.resources[ownProps.downtime].finish)
            .toISOString()
            .slice(0, 16),
          start: new Date(state.resources[ownProps.downtime].start)
            .toISOString()
            .slice(0, 16),
        }
      : null,
});

export default connect(mapStateToProps)(BlockMachineFormContainer);
