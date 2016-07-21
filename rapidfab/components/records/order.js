import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedVolume,
  FormattedDuration
} from 'rapidfab/i18n';


const SaveButtonTitle = ({ uri, uuid, record }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const Order = ({ uri, uuid, record }) => (
  <BS.Grid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/plan">
            <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/orders">
            <Fa name='files-o'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item>
            <Fa name='file-o'/> {uuid || <FormattedMessage id="records.newOrder" defaultMessage='New Order'/>}
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={6}>
        <BS.Button href="#/plan/orders" bsSize="small">
          <Fa name='arrow-left'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
        </BS.Button>
      </BS.Col>
      <BS.Col xs={6}>
        <BS.ButtonToolbar className="pull-right">
          <BS.Button bsSize="small" bsStyle="info">
            <Fa name='cloud-upload'/> <FormattedMessage id="button.upload" defaultMessage='Upload Model'/>
          </BS.Button>
          <BS.SplitButton id="uxSaveDropdown" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
            <BS.MenuItem eventKey={1}>
              <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
            </BS.MenuItem>
          </BS.SplitButton>
        </BS.ButtonToolbar>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={4}>
        <BS.Thumbnail src="//placekitten.com/600/600" responsive rouned/>
      </BS.Col>
      <BS.Col xs={8}>
        <BS.Form horizontal>
          <BS.FormGroup>
            <BS.Col xs={3}>
              <BS.ControlLabel><FormattedMessage id="field.id" defaultMessage='Id'/>:</BS.ControlLabel>
            </BS.Col>
            <BS.Col xs={9}>
              <BS.FormControl.Static>
                {uuid}
              </BS.FormControl.Static>
            </BS.Col>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxMaterial">
            <BS.Col xs={3}>
              <BS.ControlLabel><FormattedMessage id="field.material" defaultMessage='Material'/>:</BS.ControlLabel>
            </BS.Col>
            <BS.Col xs={9}>
              <BS.FormControl name="material" componentClass="text"/>
            </BS.Col>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxJob">
            <BS.Col xs={3}>
              <BS.ControlLabel><FormattedMessage id="field.job" defaultMessage='Job'/>:</BS.ControlLabel>
            </BS.Col>
            <BS.Col xs={9}>
              <BS.FormControl name="job" componentClass="text"/>
            </BS.Col>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxUseOriginalModel">
            <BS.Col xsOffset={3} xs={9}>
              <BS.Checkbox name="useOriginalModel">
                <FormattedMessage id="field.useOriginalModel" defaultMessage='Use Original Model'/>
              </BS.Checkbox>
            </BS.Col>
          </BS.FormGroup>
        </BS.Form>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={4}>
        <BS.Panel bsStyle="info">
          <BS.ListGroup fill>
            <BS.ListGroupItem header={<FormattedMessage id="field.estimatedShippingDate" defaultMessage='Estimated Shipping Date'/>}>
              {record.estimatedShippingDate ?
                <FormattedDate value={record.estimatedShippingDate}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
              }
            </BS.ListGroupItem>
            <BS.ListGroupItem header={<FormattedMessage id="field.estimatedMaterialUsed" defaultMessage='Estimated Material Used'/>}>
              {record.estimatedMaterialUsed ?
                <FormattedVolume value={record.estimatedMaterialUsed}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
              }
            </BS.ListGroupItem>
            <BS.ListGroupItem header={<FormattedMessage id="field.estimatedSupportUsed" defaultMessage='Estimated Support Used'/>}>
              {record.estimatedSupportUsed ?
                <FormattedVolume value={record.estimatedSupportUsed}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
              }
            </BS.ListGroupItem>
            <BS.ListGroupItem header={<FormattedMessage id="field.estimatedPrintTime" defaultMessage='Estimated Print Time'/>}>
              {record.estimatedPrintTime ?
                <FormattedDuration value={record.estimatedPrintTime}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
              }
            </BS.ListGroupItem>
          </BS.ListGroup>
        </BS.Panel>
      </BS.Col>
      <BS.Col xs={8}>
        <BS.Panel header={<FormattedMessage id="models" defaultMessage='Models'/>} bsStyle="primary">
          <BS.ListGroup fill>
            <BS.ListGroupItem>
              <BS.Media>
                <BS.Media.Left>
                  <BS.Image width={64} height={64} src="//placekitten.com/64/64" alt="Model Preview" rounded/>
                </BS.Media.Left>
                <BS.Media.Body>
                  <BS.Row>
                    <BS.Col xs={12}>
                      <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                    </BS.Col>
                  </BS.Row>
                  <BS.Row>
                    <BS.Col xs={8}>
                      <strong><FormattedMessage id="field.date" defaultMessage='Date'/>:</strong> {new Date().toString()}
                    </BS.Col>
                    <BS.Col xs={2}>
                      <strong><FormattedMessage id="field.size" defaultMessage='Size'/>:</strong> 100 kb
                    </BS.Col>
                    <BS.Col xs={2}>
                      <BS.Button href="#" bsSize="small" bsStyle="info" className="pull-right">
                        <Fa name='cloud-download'/> <FormattedMessage id="button.download" defaultMessage='Download'/>
                      </BS.Button>
                    </BS.Col>
                  </BS.Row>
                </BS.Media.Body>
              </BS.Media>
            </BS.ListGroupItem>
            <BS.ListGroupItem>
              <BS.Media>
                <BS.Media.Left>
                  <BS.Image width={64} height={64} src="//placekitten.com/64/64" alt="Model Preview" rounded/>
                </BS.Media.Left>
                <BS.Media.Body>
                  <BS.Row>
                    <BS.Col xs={12}>
                      <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                    </BS.Col>
                  </BS.Row>
                  <BS.Row>
                    <BS.Col xs={8}>
                      <strong><FormattedMessage id="field.date" defaultMessage='Date'/>:</strong> {new Date().toString()}
                    </BS.Col>
                    <BS.Col xs={2}>
                      <strong><FormattedMessage id="field.size" defaultMessage='Size'/>:</strong> 100 kb
                    </BS.Col>
                    <BS.Col xs={2}>
                      <BS.Button href="#" bsSize="small" bsStyle="info" className="pull-right">
                        <Fa name='cloud-download'/> <FormattedMessage id="button.download" defaultMessage='Download'/>
                      </BS.Button>
                    </BS.Col>
                  </BS.Row>
                </BS.Media.Body>
              </BS.Media>
            </BS.ListGroupItem>
          </BS.ListGroup>
        </BS.Panel>
      </BS.Col>
    </BS.Row>

  </BS.Grid>
)

Order.defaultProps = {
  record: {}
}

export default Order
