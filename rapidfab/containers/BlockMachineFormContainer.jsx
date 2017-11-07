import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Actions from 'rapidfab/actions';

import BlockMachineForm from 'rapidfab/components/BlockMachineForm';

class BlockMachineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      end: '',
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
    console.log('submit');

  }

  render() {
    const { handleInputChange, handleSubmit } = this;
    return (
      <BlockMachineForm
        {...this.state}
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

export default BlockMachineFormContainer;
