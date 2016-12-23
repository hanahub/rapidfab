import _                        from "lodash"
import React, { PropTypes }     from 'react'
import Fa                       from 'react-fontawesome'
import { Image }                from 'react-bootstrap'
import Griddle                  from 'griddle-react'
import { extractUuid }          from 'rapidfab/reducers/makeApiReducers'
import {
  FormattedDate,
  FormattedDateTime,
  FormattedNumber,
  FormattedMessage,
  FormattedVolume,
  FormattedDuration
} from 'rapidfab/i18n'


export const IdColumn = (resource, field, records, property="id") => {
  const recordsByUri = _.keyBy(records, 'uri')
  return ({ rowData }) => {
    let record = rowData
    if(field) {
      let uri = rowData[field]
      record = recordsByUri[uri]
      if(!record) return <Fa name="spinner" spin/>
    }
    return (
      <a href={`#/records/${resource}/${record.uuid}`}>
        {record[property]}
      </a>
    )
  }
}

export const DateTimeColumn = ({ data }) => (
  <FormattedDateTime value={data}/>
)

export const TimeColumn = ({ data }) => (
  <FormattedTime value={data}/>
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
  <FormattedVolume value={data} />
)

export const ColorColumn = ({ data }) => (
  <div style={{ margin: "0 auto", width: 24, height: 24, backgroundColor: data }}/>
)

const Grid = ({data, columnMeta, rowMeta, columns, useFixedHeader, bodyHeight, showTableHeading}) => (
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
    useFixedHeader={!!useFixedHeader}
    bodyHeight={bodyHeight}
    showTableHeading={!showTableHeading}
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
