import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';


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
          <BS.SplitButton bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
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
          <BS.FormGroup controlId="uxMaterialColor">
            <BS.Col xs={3}>
              <BS.ControlLabel><FormattedMessage id="field.materialColor" defaultMessage='Material / Color'/>:</BS.ControlLabel>
            </BS.Col>
            <BS.Col xs={9}>
              <BS.FormControl name="materialColor" componentClass="text"/>
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
        <BS.Panel header={<FormattedMessage id="plan.order.estimatedStatistics" defaultMessage='Estimated Statistics'/>} bsStyle="success">
          <BS.ListGroup fill>
            <BS.ListGroupItem header={<FormattedMessage id="field.shippingDate" defaultMessage='Shipping Date'/>}>
              {record.estimatedShippingDate || (<em>N/A</em>)}
            </BS.ListGroupItem>
            <BS.ListGroupItem header={<FormattedMessage id="field.materialUsed" defaultMessage='Material Used'/>}>
              {record.estimatedMaterialUsed || (<em>N/A</em>)}
            </BS.ListGroupItem>
            <BS.ListGroupItem header={<FormattedMessage id="field.supportUsed" defaultMessage='Support Used'/>}>
              {record.estimatedSupportUsed || (<em>N/A</em>)}
            </BS.ListGroupItem>
            <BS.ListGroupItem header={<FormattedMessage id="field.printTime" defaultMessage='Print Time'/>}>
              {record.estimatedPrintTime || (<em>N/A</em>)}
            </BS.ListGroupItem>
          </BS.ListGroup>
        </BS.Panel>
      </BS.Col>
      <BS.Col xs={8}>
        <BS.Panel header="Models" bsStyle="primary">
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
                        <Fa name='cloud-download'/> <FormattedMessage id="buttons.download" defaultMessage='Download'/>
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
                        <Fa name='cloud-download'/> <FormattedMessage id="buttons.download" defaultMessage='Download'/>
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
