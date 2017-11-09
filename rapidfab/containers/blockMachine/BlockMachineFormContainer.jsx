import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import BlockMachineForm from 'rapidfab/components/blockMachine/BlockMachineForm';

class BlockMachineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      finish: '',
      start: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, machineType, uri } = this.props;
    const payload = {
      description: this.state.description,
      [machineType]: uri,
      finish: this.state.finish,
      start: this.state.start,
    };
    dispatch(Actions.Api.wyatt['block-machine'].post(payload));
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

BlockMachineFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  machineType: PropTypes.oneOf(['post-processor', 'printer']).isRequired,
  uri: PropTypes.string.isRequired,
};

export default connect()(BlockMachineFormContainer);
