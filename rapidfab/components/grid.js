import React, { PropTypes }                 from 'react';
import Fa                                   from 'react-fontawesome';
import { Image }                            from 'react-bootstrap';
import Griddle                              from 'griddle-react';
import {
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedVolume,
  FormattedDuration
} from 'rapidfab/i18n';


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
    tableClassName="table table-bordered"
    useGriddleStyles={false}
    sortAscendingComponent={<Fa name="sort-asc" className="pull-right"/>}
    sortDescendingComponent={<Fa name="sort-desc" className="pull-right"/>}
    showPager={false}
    results={data}
    columnMetadata={columnMeta}
    rowMetadata={rowMeta}
    columns={columns}
  />
)

Grid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columnMeta: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.string)
}

Grid.defaultProps = {
  data: []
}

export default Grid
