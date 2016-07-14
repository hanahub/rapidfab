import React, { PropTypes } from 'react';
import Griddle              from 'griddle-react';

const Grid = ({data, columnMeta, columns}) => (
  <Griddle
    tableClassName="table table-hover table-striped table-condensed"
    useGriddleStyles={false}
    sortAscendingComponent={<span className="fa fa-sort-alpha-asc"></span>}
    sortDescendingComponent={<span className="fa fa-sort-alpha-desc"></span>}
    showPager={false}
    results={data}
    columnMetadata={columnMeta}
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
