import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';
import { FormattedMessage }     from 'react-intl';

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
      displayName: <FormattedMessage id="field.model" defaultMessage='Model'/>,
    }, {
      columnName: "type",
      displayName: <FormattedMessage id="field.type" defaultMessage='Type'/>,
    }, {
      columnName: "manufacturer",
      displayName: <FormattedMessage id="field.manufacturer" defaultMessage='manufacturer'/>,
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
