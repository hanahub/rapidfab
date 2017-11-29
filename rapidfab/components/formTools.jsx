import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';

export function FormControlTextCareful({ value, onChange }) {
  const safeValue = value == null ? '' : value;
  return <BS.FormControl type="text" value={safeValue} onChange={onChange} />;
}

FormControlTextCareful.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function FormControlTextArea({ id, value, onChange }) {
  return (
    <BS.FormControl
      componentClass="textarea"
      id={id}
      value={value}
      onChange={onChange}
    />
  );
}

FormControlTextArea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function FormControlSelect({ onChange, children, id, value }) {
  return (
    <BS.FormControl
      componentClass="select"
      id={id}
      value={value}
      onChange={onChange}
    >
      {children}
    </BS.FormControl>
  );
}

FormControlSelect.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
