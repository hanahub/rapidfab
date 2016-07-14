import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';


const ManufacturersGrid = ({ data, onAdd, onEdit }) => (
  <EditorGrid
    data={data}
    onAdd={onAdd}
    onEdit={onEdit}
    columns={[
      "name",
      "email",
      "location",
      "locationAccess"
    ]}
    columnMeta={[{
      columnName: "name",
      displayName: "Name"
    }, {
      columnName: "email",
      displayName: "Email"
    }, {
      columnName: "location",
      displayName: "Location"
    }, {
      columnName: "locationAccess",
      displayName: "Location Access"
    }]}
  />
)

ManufacturersGrid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ManufacturersGrid
