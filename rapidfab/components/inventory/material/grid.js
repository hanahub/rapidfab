import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';


const Grid = ({ data, onAdd, onEdit }) => (
  <EditorGrid
    data={data}
    onAdd={onAdd}
    onEdit={onEdit}
    columns={[
      "material",
      "type",
      "manufacturer",
      "package",
      "color"
    ]}
    columnMeta={[{
      columnName: "material",
      displayName: "Material"
    }, {
      columnName: "type",
      displayName: "Type"
    }, {
      columnName: "manufacturer",
      displayName: "Manufacturer"
    }, {
      columnName: "package",
      displayName: "Package"
    }, {
      columnName: "color",
      displayName: "Color"
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
