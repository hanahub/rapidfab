import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';


const Grid = ({ data, onAdd, onEdit }) => (
  <EditorGrid
    data={data}
    onAdd={onAdd}
    onEdit={onEdit}
    columns={[
      "resource",
      "material",
      "color",
      "status",
      "balance"
    ]}
    columnMeta={[{
      columnName: "resource",
      displayName: "Resource"
    }, {
      columnName: "material",
      displayName: "Material"
    }, {
      columnName: "color",
      displayName: "Color"
    }, {
      columnName: "status",
      displayName: "Status"
    }, {
      columnName: "balance",
      displayName: "Balance"
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
