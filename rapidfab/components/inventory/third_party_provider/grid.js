import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';
import { FormattedMessage }     from 'react-intl';


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
      displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>,
    }, {
      columnName: "contact",
      displayName: <FormattedMessage id="field.contact" defaultMessage='Contact'/>,
    }, {
      columnName: "location",
      displayName: <FormattedMessage id="field.location" defaultMessage='Location'/>,
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
