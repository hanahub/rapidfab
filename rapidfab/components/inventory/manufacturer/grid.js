import React, { PropTypes }     from "react";
import EditorGrid      from 'rapidfab/components/editorGrid';


const ManufacturersGrid = ({ data, onAdd, onEdit }) => (
  <EditorGrid
    data={data}
    onAdd={onAdd}
    onEdit={onEdit}
    columns={[
      "name",
      "commercialContact",
      "commercialPhone",
      "supportContact",
      "supportPhone"
    ]}
    columnMeta={[{
      columnName: "name",
      displayName: "Name"
    }, {
      columnName: "commercialContact",
      displayName: "Commercial Contact"
    }, {
      columnName: "commercialPhone",
      displayName: "Commercial Phone"
    }, {
      columnName: "supportContact",
      displayName: "Support Contact"
    }, {
      columnName: "supportPhone",
      displayName: "Support Phone",
    }, {
      columnName: "address",
      displayName: "Address",
      visible: false
    }, {
      columnName: "notes",
      displayName: "Notes",
      visible: false
    }]}
  />
)

ManufacturersGrid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ManufacturersGrid
