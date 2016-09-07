import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import _                        from "lodash"
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const Edit = ({ fields, handleSubmit, load, submitting, onDelete, materials, model, uploadModel }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='book'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/orders">
              <Fa name='object-group'/> <FormattedMessage id="inventory.orders" defaultMessage='Orders'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='object-ungroup'/> {fields.id.value || <FormattedMessage id="record.order.new" defaultMessage='New Order'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/orders" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.orders" defaultMessage='Orders'/>
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.ButtonToolbar className="pull-right">
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)} disabled={!fields.id.value}>
                <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
              </BS.MenuItem>
            </BS.SplitButton>
          </BS.ButtonToolbar>
        </BS.Col>
      </BS.Row>

      <hr/>

      <BS.ProgressBar active now={uploadModel.percent} />

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxBaseMaterials">
            <BS.ControlLabel><FormattedMessage id="field.baseMaterials" defaultMessage='Base Materials'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.base_material}>
              {_.map(materials, material => (
                <option key={material.uri} value={material.uri}>{material.name}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxSupportMaterials">
            <BS.ControlLabel><FormattedMessage id="field.supportMaterials" defaultMessage='Support Materials'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.support_material}>
              {_.map(materials, material => (
                <option key={material.uri} value={material.uri}>{material.name}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxAddress">
            <BS.ControlLabel><FormattedMessage id="field.address" defaultMessage='Address'/>:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.address}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxQuantity">
            <BS.ControlLabel><FormattedMessage id="field.quantity" defaultMessage='Quantity'/>:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.quantity}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCreated">
            <BS.ControlLabel><FormattedMessage id="field.created" defaultMessage='Created'/>:</BS.ControlLabel>
            <BS.FormControl.Static>
              {fields.created.value ?
                <FormattedDate value={fields.created.value}/> :
                  (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
              }
            </BS.FormControl.Static>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxModel">
            <BS.ControlLabel><FormattedMessage id="field.model" defaultMessage='Model'/>:</BS.ControlLabel>
            <BS.FormControl type="file" {...fields.model} value={null} required />
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default Edit
