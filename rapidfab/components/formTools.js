import React from 'react';
import * as BS from 'react-bootstrap';

export function FormControlTextCareful({initial, value, onChange}) {
  const safeValue = (value == null) ? "" : value;
  const safeInitial = (initial == null) ? "" : initial;
  return (
    <BS.FormControl type="text" value={safeValue} onChange={onChange}/>
  )
}

export function FormControlTextArea({id, value, onChange}) {
  return (
    <BS.FormControl componentClass="textarea" id={id} value={value} onChange={onChange}/>
  )
}

