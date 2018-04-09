import React from 'react';

import extractUuid from 'rapidfab/utils/extractUuid';
import withRowData from './withRowData';

export default withRowData(({ resource, rowData, value }) => (
  <span>
    <a href={`#/records/${resource}/${extractUuid(rowData.uri)}`}>{value}</a>
  </span>
));
