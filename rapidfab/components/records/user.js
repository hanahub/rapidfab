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

const UserForm = ({ fields, bureaus, handleSubmit, load, submitting, onDelete, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active={true}>
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/users">
              <Fa name='users'/> <FormattedMessage id="inventory.users" defaultMessage='Users'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='users'/> {fields.id.value || <FormattedMessage id="record.user.new" defaultMessage='New User'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/users" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.users" defaultMessage='Users'/>
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.ButtonToolbar className="pull-right">
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uri.value, bureaus)} disabled={!fields.id.value}>
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
          <BS.FormGroup controlId="uxEmail">
            <BS.ControlLabel><FormattedMessage id="field.email" defaultMessage='Email'/>:</BS.ControlLabel>
            <BS.FormControl name="email" type="text" required {...fields.email}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxUsername">
            <BS.ControlLabel><FormattedMessage id="field.username" defaultMessage='Username'/>:</BS.ControlLabel>
            <BS.FormControl name="username" type="text" required {...fields.username}/>
          </BS.FormGroup>
          <BS.FormGroup style={{ display: "none" }} controlId="uxBureau">
            <BS.ControlLabel><FormattedMessage id="field.bureau" defaultMessage='Bureau'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" placeholder="bureau" {...fields.bureau}>
              {_.map(bureaus, bureau => (
                <option key={bureau.uri} value={bureau.uri}>{bureau.uri}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default UserForm
