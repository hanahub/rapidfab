import React from 'react';
import * as BS from 'react-bootstrap';

export function FormControlTextCareful({initial, value}) {
  const safeValue = (value == null) ? "" : value;
  const safeInitial = (initial == null) ? "" : initial;
  return (
    <BS.FormControl type="text" value={safeValue}/>
  )
}
