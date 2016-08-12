import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedMessage
} from 'rapidfab/i18n';


const OrderModels = ({ models }) => (
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
)

export default OrderModels
