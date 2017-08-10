import _ from 'lodash';
import React, { PropTypes } from 'react';
import Fa from 'react-fontawesome';
import { Image } from 'react-bootstrap';
import Griddle from 'griddle-react';
import {
  FormattedDate,
  FormattedDateTime,
  FormattedNumber,
  FormattedVolume,
} from 'rapidfab/i18n';
import StatusDot from 'rapidfab/components/statusDot';


export const IdColumn = (resource, field, records, property = 'id') => {
  const recordsByUri = _.keyBy(records, 'uri');
  return ({ rowData }) => {
    let record = rowData;
    if (field) {
      const uri = rowData[field];
      record = recordsByUri[uri];
      if (!record) return <Fa name="spinner" spin />;
    }
    return (
      <a href={`#/records/${resource}/${record.uuid}`}>
        {record[property]}
      </a>
    );
  };
};

export const StatusColumn = (field, records, mapping) => {
  // field: field to search for on rowdata e.g. "modeler"
  // records: records of the type the field is associated with e.g. modelers
  // mapping: records should have a status, and the mapping maps a status string
  //   to a class string defined in main.less. can optionally provide message for a popover
  const recordsByUri = _.keyBy(records, 'uri');
  return ({ rowData }) => {
    const uri = rowData[field];
    const record = recordsByUri[uri];

    if (record) {
      const status = mapping[record.status].status;
      const message = mapping[record.status].message; // undefined if message isnt passed, this is fine

      return <StatusDot status={status} message={message} />;
    }
    return <StatusDot status="unknown" message="Modeler not found" />;
  };
};

export const MappedColumn = (field, mapping) =>
  // field: field to search for on rowdata e.g. "status"
  // mapping: an object mapping with keys matching records, and values being i18n formatted messages.
  //     if no match is found in the mapping, throws an error.
  ({ rowData }) => {
    const message = mapping[rowData[field]];

    if (!message) {
      throw new Error(`no mapping for ${rowData[field]} found`);
    }
    return message;
  };


export const DateTimeColumn = ({ data }) => (
  <FormattedDateTime value={data} />
);

export const TimeColumn = ({ data }) => (
  <FormattedTime value={data} />
);

export const DateColumn = ({ data }) => (
  <FormattedDate value={data} />
);

export const ImageColumn = ({ data }) => (
  <div style={{ textAlign: 'center' }}>
    <Image src={data} width={24} rouned />
  </div>
);

export const CapitalizeColumn = ({ data }) => (
  <span style={{ textTransform: 'capitalize' }}>
    {data}
  </span>
);

export const BooleanColumn = ({ data }) => (
  <div style={{ textAlign: 'center' }}>
    <Fa name={data ? 'check-square-o' : 'square-o'} />
  </div>
);

export const NumberColumn = ({ data }) => (
  <FormattedNumber value={data} />
);

export const VolumeColumn = ({ data }) => (
  <FormattedVolume value={data} />
);

export const ColorColumn = ({ data }) => (
  <div style={{ margin: '0 auto', width: 24, height: 24, backgroundColor: data }} />
);

const Grid = ({ data, columnMeta, rowMeta, columns, useFixedHeader, bodyHeight, showTableHeading, initialSort = null, initialSortAscending = true }) => (
  <Griddle
    bodyHeight={bodyHeight}
    columns={columns}
    columnMetadata={columnMeta}
    initialSort={initialSort}
    initialSortAscending={initialSortAscending}
    results={_.values(data)}
    resultsPerPage={9999}
    rowMetadata={rowMeta}
    showPager={false}
    showTableHeading={!showTableHeading}
    sortAscendingComponent={<Fa name="sort-asc" className="pull-right" />}
    sortDescendingComponent={<Fa name="sort-desc" className="pull-right" />}
    tableClassName="table table-bordered table-hover"
    useGriddleStyles={false}
    useFixedHeader={!!useFixedHeader}
  />
);

Grid.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  columnMeta: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.string),
};

Grid.defaultProps = {
  data: [],
};

export default Grid;
