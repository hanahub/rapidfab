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

const PostProcessorForm = ({ fields, handleSubmit, load, submitting, onDelete, locations, postProcessorTypes, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/post-processors">
              <Fa name='object-ungroup'/> <FormattedMessage id="inventory.postProcessors" defaultMessage='Post Processors'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='object-ungroup'/> {fields.id.value || <FormattedMessage id="record.newPostProcessor" defaultMessage='New Post Processor'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/post-processors" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.postProcessors" defaultMessage='Post Processors'/>
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
            <BS.ControlLabel>Name:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxLocation">
            <BS.ControlLabel><FormattedMessage id="field.location" defaultMessage='Location'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" placeholder="location" required {...fields.location}>
              <option key="placeholder" value="" disabled>Select a Location</option>
              {_.map(locations, location => (
                <option key={location.uri} value={location.uri}>{location.name}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxPostProcessorType">
            <BS.ControlLabel><FormattedMessage id="field.postProcessorType" defaultMessage='Post Processor Type'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" placeholder="post_processor_type" required {...fields.post_processor_type}>
              <option key="placeholder" value="" disabled>Select a Post Processor Type</option>
              {_.map(postProcessorTypes, postProcessorType => (
                <option key={postProcessorType.uri} value={postProcessorType.uri}>{postProcessorType.name}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default PostProcessorForm
