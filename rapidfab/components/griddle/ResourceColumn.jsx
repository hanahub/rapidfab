import React from 'react';
import extractUuid from 'rapidfab/utils/extractUuid';
import { FormattedMessage } from 'rapidfab/i18n';
import withRowData from './withRowData';

export default withRowData(({ resource, resources, rowData, slug }) => {
  const record = resources[rowData[resource]];
  return record ? (
    <span>
      <a href={`#/records/${slug || resource}/${extractUuid(record.uri)}`}>
        {record.name}
      </a>
    </span>
  ) : (
    <FormattedMessage id="notAvailable" defaultMessage="N/A" />
  );
});
