import React, { PropTypes }     from "react";
import EditorGrid      from 'rapidfab/components/editorGrid';
import { FormattedMessage }     from 'react-intl';


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
      displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>
    }, {
      columnName: "commercialContact",
      displayName: <FormattedMessage id="field.commercialContact" defaultMessage='Commercial Contact'/>
    }, {
      columnName: "commercialPhone",
      displayName: <FormattedMessage id="field.commercialPhone" defaultMessage='Commercial Phone'/>
    }, {
      columnName: "supportContact",
      displayName: <FormattedMessage id="field.supportContact" defaultMessage='Support Contact'/>
    }, {
      columnName: "supportPhone",
      displayName: <FormattedMessage id="field.supportPhone" defaultMessage='Support Phone'/>
    }, {
      columnName: "address",
      visible: false,
      displayName: <FormattedMessage id="field.address" defaultMessage='Address'/>,
    }, {
      columnName: "notes",
      visible: false,
      displayName: <FormattedMessage id="field.notes" defaultMessage='Notes'/>,
    }]}
  />
)

ManufacturersGrid.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ManufacturersGrid
