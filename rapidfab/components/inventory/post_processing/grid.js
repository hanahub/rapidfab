import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';


const Grid = ({ data, onAdd, onEdit }) => (
  <EditorGrid
    data={data}
    onAdd={onAdd}
    onEdit={onEdit}
    columns={[
      "model",
      "type",
      "manufacturer",
    ]}
    columnMeta={[{
      columnName: "model",
      displayName: "Model"
    }, {
      columnName: "type",
      displayName: "Type"
    }, {
      columnName: "manufacturer",
      displayName: "Manufacturer"
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
