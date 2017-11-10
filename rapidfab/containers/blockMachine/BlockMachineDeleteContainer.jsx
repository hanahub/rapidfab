import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import BlockMachineDelete from 'rapidfab/components/blockMachine/BlockMachineDelete';

class BlockMachineDeleteContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleBack() {
    this.props.handleSelectionChange(this.props.uuid);
  }

  async handleDelete() {
    const { dispatch, handleSelectionChange, uuid } = this.props;
    const response = await dispatch(
      Actions.Api.wyatt['block-machine'].delete(uuid)
    );
    if (response.type === 'RESOURCE_DELETE_SUCCESS') {
      handleSelectionChange('none');
    }
  }

  render() {
    return (
      <BlockMachineDelete
        {...this.props}
        handleBack={this.handleBack}
        handleDelete={this.handleDelete}
      />
    );
  }
}

BlockMachineDeleteContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  description: state.resources[ownProps.uuid].description,
});

export default connect(mapStateToProps)(BlockMachineDeleteContainer);
