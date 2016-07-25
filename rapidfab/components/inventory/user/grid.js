import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';
import { FormattedMessage }     from 'react-intl';


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
      displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>,
    }, {
      columnName: "email",
      displayName: <FormattedMessage id="field.email" defaultMessage='Email'/>
    }, {
      columnName: "location",
      displayName: <FormattedMessage id="field.location" defaultMessage='Location'/>
    }, {
      columnName: "locationAccess",
      displayName: <FormattedMessage id="field.locationAccess" defaultMessage='Location Access'/>
    }]}
  />
)

ManufacturersGrid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ManufacturersGrid
