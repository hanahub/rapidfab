import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { Image } from 'react-bootstrap';
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

export const IdColumn = (resource, field, records, property = 'id') => {
  const recordsByUri = _.keyBy(records, 'uri');
  const Column = ({ rowData }) => {
    let record = rowData;
    if (field) {
      const uri = rowData[field];
      record = recordsByUri[uri];
      if (!record) return <Fa name="spinner" spin />;
    }
    return (
      <a href={`#/records/${resource}/${record.uuid}`}>{record[property]}</a>
    );
  };
  Column.propTypes = {
    rowData: PropTypes.shape({}).isRequired,
  };
  return Column;
};

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

export const MappedColumn = (field, mapping) => {
  // field: field to search for on rowdata e.g. "status"
  // mapping: an object mapping with keys matching records,
  // and values being i18n formatted messages.
  //     if no match is found in the mapping, throws an error.
  const Column = ({ rowData }) => {
    const message = mapping[rowData[field]];

    if (!message) {
      return <FormattedMessage id="notAvailable" defaultMessage="N/A" />;
    }
    return message;
  };
  Column.propTypes = {
    rowData: PropTypes.shape({}).isRequired,
  };
  return Column;
};

export const DateTimeColumn = ({ data }) =>
  data ? <FormattedDateTime value={data} /> : null;

DateTimeColumn.propTypes = { data: PropTypes.string.isRequired };

export const TimeColumn = ({ data }) => <FormattedTime value={data} />;

TimeColumn.propTypes = { data: PropTypes.string.isRequired };

export const DateColumn = ({ data }) => <FormattedDate value={data} />;

DateColumn.propTypes = { data: PropTypes.string.isRequired };

export const ImageColumn = ({ data }) => (
  <div style={{ textAlign: 'center' }}>
    <Image src={data} width={24} rouned />
  </div>
);

ImageColumn.propTypes = { data: PropTypes.string.isRequired };

export const CapitalizeColumn = ({ data }) => (
  <span style={{ textTransform: 'capitalize' }}>{data}</span>
);

CapitalizeColumn.propTypes = { data: PropTypes.string.isRequired };

export const BooleanColumn = ({ data }) => (
  <div style={{ textAlign: 'center' }}>
    <Fa name={data ? 'check-square-o' : 'square-o'} />
  </div>
);

BooleanColumn.propTypes = { data: PropTypes.string.isRequired };

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
  rowMeta,
  columns,
  useFixedHeader,
  bodyHeight,
  showTableHeading,
  initialSort,
  initialSortAscending,
}) => (
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
  bodyHeight: PropTypes.number,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  columnMeta: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowMeta: PropTypes.shape({}),
  showTableHeading: PropTypes.bool,
  useFixedHeader: PropTypes.bool,
};

Grid.defaultProps = {
  bodyHeight: null,
  data: [],
  initialSort: null,
  initialAscending: false,
  useFixedHeader: false,
  rowMeta: null,
  showTableHeading: false,
};

export default Grid;
