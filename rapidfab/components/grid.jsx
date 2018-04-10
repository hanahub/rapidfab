import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Griddle from 'griddle-react';
import {
  FormattedDate,
  FormattedDateTime,
  FormattedMessage,
  FormattedNumber,
  FormattedTime,
  FormattedVolume,
} from 'rapidfab/i18n';
import StatusDot from 'rapidfab/components/statusDot';

const NotAvailable = () => (
  <FormattedMessage id="notAvailable" defualtMessage="Not Available" />
);

export const StatusColumn = (field, records, mapping) => {
  // field: field to search for on rowdata e.g. "modeler"
  // records: records of the type the field is associated with e.g. modelers
  // mapping: records should have a status, and the mapping maps a status string
  //   to a class string defined in main.less. can optionally provide message for a popover
  const recordsByUri = _.keyBy(records, 'uri');
  const Column = ({ rowData }) => {
    const uri = rowData[field];
    const record = recordsByUri[uri];

    if (record) {
      const status = mapping[record.status].status;
      // undefined if message isnt passed, this is fine
      const message = mapping[record.status].message;
      return <StatusDot status={status} message={message} />;
    }
    return <StatusDot status="unknown" message="Modeler not found" />;
  };
  Column.propTypes = {
    rowData: PropTypes.shape({}).isRequired,
  };
  return Column;
};

export const MappedColumn = ({ mapping, value }) => (
  <span>{mapping[value] ? mapping[value] : <NotAvailable />}</span>
);

MappedColumn.propTypes = {
  mapping: PropTypes.shape({}).isRequired,
  value: PropTypes.string.isRequired,
};

export const DateTimeColumn = ({ value }) =>
  value ? <FormattedDateTime value={value} /> : <NotAvailable />;

DateTimeColumn.propTypes = { value: PropTypes.string.isRequired };

export const TimeColumn = ({ data }) => <FormattedTime value={data} />;

TimeColumn.propTypes = { data: PropTypes.string.isRequired };

export const DateColumn = ({ data }) => <FormattedDate value={data} />;

DateColumn.propTypes = { data: PropTypes.string.isRequired };

export const CapitalizeColumn = ({ data }) => (
  <span style={{ textTransform: 'capitalize' }}>{data}</span>
);

CapitalizeColumn.propTypes = { data: PropTypes.string.isRequired };

export const NumberColumn = ({ data }) => <FormattedNumber value={data} />;

NumberColumn.propTypes = { data: PropTypes.string.isRequired };

export const VolumeColumn = ({ data }) => <FormattedVolume value={data} />;

VolumeColumn.propTypes = { data: PropTypes.string.isRequired };

export const ColorColumn = ({ data }) => (
  <div
    style={{ margin: '0 auto', width: 24, height: 24, backgroundColor: data }}
  />
);

ColorColumn.propTypes = { data: PropTypes.string.isRequired };

const Grid = ({
  data,
  columnMeta,
  columns,
  initialSort,
  initialSortAscending,
  showFilter,
}) => (
  <Griddle
    columns={columns}
    columnMetadata={columnMeta}
    initialSort={initialSort}
    initialSortAscending={initialSortAscending}
    results={data}
    resultsPerPage={9999}
    showFilter={showFilter}
    showPager={false}
    tableClassName="table table-bordered table-hover"
    useGriddleStyles={false}
  />
);

Grid.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  columnMeta: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSort: PropTypes.bool,
  initialSortAscending: PropTypes.bool,
  showFilter: PropTypes.bool.isRequired,
};

Grid.defaultProps = {
  data: [],
  initialSort: null,
  initialSortAscending: false,
  showFilter: false,
};

export default Grid;
