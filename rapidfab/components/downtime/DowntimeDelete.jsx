import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

const styles = {
  spacingDown: { marginBottom: '2rem' },
};

const DowntimeDelete = ({ description, handleBack, handleDelete }) => (
  <div>
    <h2 style={styles.spacingDown}>Really delete {description}?</h2>
    <Button bsStyle="danger" block onClick={handleDelete}>
      Delete
    </Button>
    <Button block onClick={handleBack}>
      Back
    </Button>
  </div>
);

DowntimeDelete.propTypes = {
  description: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DowntimeDelete;
