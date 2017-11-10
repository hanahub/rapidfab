import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

const BlockMachineDelete = ({ handleBack, handleDelete }) => (
  <div>
    <Button bsStyle="danger" block onClick={handleDelete}>
      Delete
    </Button>
    <Button block onClick={handleBack}>
      Back
    </Button>
  </div>
);

BlockMachineDelete.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default BlockMachineDelete;
