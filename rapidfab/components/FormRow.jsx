import React from 'react';
import PropTypes from 'prop-types';

const FormRow = ({ id, defaultMessage, children }) =>
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />:
      </ControlLabel>
    </Col>
    <Col xs={9}>
      {children}
    </Col>
  </FormGroup>;

FormRow.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default FormRow;
