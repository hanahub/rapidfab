import React from 'react';

const ShowMaybe = ({ showIf, children }) => (
  <div>
    { showIf ? children : null }
  </div>
);

export default ShowMaybe;
