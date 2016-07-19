import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';


const Grid = ({ data, onAdd, onEdit }) => (
  <EditorGrid
    data={data}
    onAdd={onAdd}
    onEdit={onEdit}
    columns={[
      "name",
      "contact",
      "location",
    ]}
    columnMeta={[{
      columnName: "name",
      displayName: "Name"
    }, {
      columnName: "contact",
      displayName: "Contact"
    }, {
      columnName: "location",
      displayName: "Location"
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
