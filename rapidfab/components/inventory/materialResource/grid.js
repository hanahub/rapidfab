import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';
import { FormattedMessage }     from 'react-intl';


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
      displayName: <FormattedMessage id="field.resource" defaultMessage="resource"/>
    }, {
      columnName: "material",
      displayName: <FormattedMessage id="field.material" defaultMessage="Material"/>
    }, {
      columnName: "color",
      displayName: <FormattedMessage id="field.color" defaultMessage="Color"/>
    }, {
      columnName: "status",
      displayName: <FormattedMessage id="field.status" defaultMessage="Status"/>
    }, {
      columnName: "balance",
      displayName: <FormattedMessage id="field.balance" defaultMessage="Balance"/>
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
