import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import Error                    from 'rapidfab/components/error'

const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const PostProcessorTypeForm = ({ fields, handleSubmit, load, submitting, onDelete, manufacturers, materials, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active={true}>
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/post-processor-types">
              <Fa name='object-group'/> <FormattedMessage id="inventory.postProcessorTypes" defaultMessage='Post Processor Types'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='object-group'/> {fields.id.value || <FormattedMessage id="record.postProcessorType.new" defaultMessage='New Post Processor Type'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/post-processor-types" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.postProcessorTypes" defaultMessage='Post Processor Types'/>
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

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors}/>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxDescription">
            <BS.ControlLabel><FormattedMessage id="field.description" defaultMessage='Description'/>:</BS.ControlLabel>
            <BS.FormControl name="description" type="text" {...fields.description}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxMaterials">
            <BS.ControlLabel><FormattedMessage id="field.materials" defaultMessage='Materials'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" multiple required {...fields.materials}>
              {_.map(materials, material => (
                <option key={material.uri} value={material.uri}>{material.name}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxManufacturer">
            <BS.ControlLabel><FormattedMessage id="field.manufacturer" defaultMessage='Manufacturer'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" placeholder="manufacturer" required {...fields.manufacturer}>
              <option key="placeholder" value="" selected disabled>Select a Manufacturer</option>
              {_.map(manufacturers, manufacturer=> (
                <option key={manufacturer.uri} value={manufacturer.uri}>{manufacturer.name}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default PostProcessorTypeForm
