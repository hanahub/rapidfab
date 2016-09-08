import React, { PropTypes }   from "react"
import * as BS                from 'react-bootstrap'
import Fa                     from 'react-fontawesome'
import { FormattedMessage }   from 'rapidfab/i18n'
import OrderForm              from './form'
import OrderEstimates         from './estimates'
import OrderPrints            from './prints'
import Error                  from 'rapidfab/components/error'


const SaveButtonTitle = ({ uri, uuid, record }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const Order = ({ fields, handleSubmit, load, submitting, onDelete, materials, models, prints, apiErrors, snapshot }) => (
  <BS.Form horizontal onSubmit={handleSubmit}>
    <BS.Grid>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/plan/orders">
              <Fa name='files-o'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='file-o'/> {fields.id.value || <FormattedMessage id="records.newOrder" defaultMessage='New Order'/>}
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
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)}>
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
        <BS.Col xs={4}>
          <BS.Thumbnail src={snapshot} responsive/>
        </BS.Col>
        <BS.Col xs={8}>
          <OrderForm fields={fields} materials={materials} models={models}/>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={4}>
          <OrderEstimates estimates={fields.estimates}/>
        </BS.Col>
        <BS.Col xs={8}>
          <OrderPrints prints={prints}/>
        </BS.Col>
      </BS.Row>

    </BS.Grid>
  </BS.Form>
)

export default Order
