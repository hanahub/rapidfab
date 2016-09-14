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

const Loader = () => (
  <BS.Row>
    <BS.Col xs={12}>
      <Fa name="spinner" spin/>
    </BS.Col>
  </BS.Row>
)


const ThirdPartyProviderForm = ({ fields }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>Name:</BS.ControlLabel>
        <BS.FormControl name="name" type="text" required {...fields.name}/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxDescription">
        <BS.ControlLabel>Description:</BS.ControlLabel>
        <BS.FormControl name="address" type="text" componentClass="textarea" {...fields.description}/>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

const ThirdPartyProvider = ({ fields, handleSubmit, submitting, onDelete, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/third-party-providers">
              <Fa name='map-marker'/> <FormattedMessage id="inventory.third_party_providers" defaultMessage='Third Party Providers'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='map-marker'/> {fields.id.value || <FormattedMessage id="record.newThirdPartyProvider" defaultMessage='New Third Party Provider'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/third-party-providers" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.third_party_providers" defaultMessage='Third Party PRoviders'/>
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

      {submitting ?
        <Loader /> :
        <ThirdPartyProviderForm fields={fields} />
      }

    </BS.Grid>
  </form>
)

export default ThirdPartyProvider
