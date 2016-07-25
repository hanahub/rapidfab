import React, { PropTypes }     from "react";
import EditorGrid               from 'rapidfab/components/editorGrid';
import { FormattedMessage }     from 'react-intl';

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
      displayName: <FormattedMessage id="field.material" defaultMessage='Material'/>
    }, {
      columnName: "type",
      displayName: <FormattedMessage id='field.type' defaultMessage="Type"/>
    }, {
      columnName: "manufacturer",
      displayName: <FormattedMessage id='field.manufacturer' defaultMessage="Manufacturer"/>
    }, {
      columnName: "package",
      displayName: <FormattedMessage id='field.package' defaultMessage="Package"/>
    }, {
      columnName: "color",
      displayName: <FormattedMessage id='field.color' defaultMessage="Color"/>
    }]}
  />
)

Grid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default Grid
