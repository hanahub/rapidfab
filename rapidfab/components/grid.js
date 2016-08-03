import _                        from "lodash"
import React, { PropTypes }     from 'react';
import Fa                       from 'react-fontawesome';
import { Image }                from 'react-bootstrap';
import Griddle                  from 'griddle-react';
import {
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedVolume,
  FormattedDuration
} from 'rapidfab/i18n';

export const IdColumn = resource => (
  ({ data, rowData }) => (
    <a href={`#/records/${resource}/${encodeURIComponent(rowData.uuid)}`}>
      {data}
    </a>
  )
)

export const DateColumn = ({ data }) => (
  <FormattedDate value={data}/>
)

export const ImageColumn = ({ data }) => (
  <div style={{ textAlign: "center" }}>
    <Image src={data} width={24} rouned/>
  </div>
)

export const CapitalizeColumn = ({ data }) => (
  <span style={{ textTransform: "capitalize" }}>
    {data}
  </span>
)

export const BooleanColumn = ({ data }) => (
  <div style={{ textAlign: "center" }}>
    <Fa name={data ? "check-square-o" : "square-o"} />
  </div>
)

export const NumberColumn = ({ data }) => (
  <FormattedNumber value={data}/>
)

export const VolumeColumn = ({ data }) => (
  <FormattedVolume value={data}/>
)

const Grid = ({data, columnMeta, rowMeta, columns}) => (
  <Griddle
    tableClassName="table table-bordered table-hover"
    useGriddleStyles={false}
    sortAscendingComponent={<Fa name="sort-asc" className="pull-right"/>}
    sortDescendingComponent={<Fa name="sort-desc" className="pull-right"/>}
    showPager={false}
    results={_.values(data)}
    columnMetadata={columnMeta}
    rowMetadata={rowMeta}
    columns={columns}
    resultsPerPage={9999}
  />
)

Grid.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]),
  columnMeta: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.string)
}

Grid.defaultProps = {
  data: []
}

export default Grid
