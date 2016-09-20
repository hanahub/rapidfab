import React, { PropTypes }   from "react"
import * as BS                from 'react-bootstrap'
import Fa                     from 'react-fontawesome'
import { FormattedMessage }   from 'rapidfab/i18n'
import OrderForm              from './form'
import OrderEstimates         from './estimates'
import OrderPrints            from './prints'
import OrderRuns              from './runs'
import Error                  from 'rapidfab/components/error'
import ThumbnailPlaceholder   from 'rapidfab/images/thumbnail-placeholder.png'


const SaveButtonTitle = ({ uri, uuid, record }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const Navigation = ({ fields, onDelete }) => (
  <div>
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
            <Fa name='file-o'/> {fields.id.value || <FormattedMessage id="record.order.new" defaultMessage='New Order'/>}
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
          <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
            <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)}>
              <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
            </BS.MenuItem>
          </BS.SplitButton>
        </BS.ButtonToolbar>
      </BS.Col>
    </BS.Row>
  </div>
)

const Loader = () => (
  <BS.Row>
    <BS.Col xs={12}>
      <Fa name="spinner" spin/>
    </BS.Col>
  </BS.Row>
)

const Thumbnail = ({src}) => {
  if(!src) {
    return (
      <div>
        <BS.Thumbnail src={ThumbnailPlaceholder} />
        <Fa name="spinner" spin/>
        <span> </span>
        <FormattedMessage id="loading.thumbnail" defaultMessage="Loading Thumbnail..."/>
      </div>
    );
  } else {
    return (<BS.Thumbnail src={src} />);
  }
}

const OrderContainer = ({ fields, materials, models, modelsIsFetching, prints, providers, runs, snapshot}) => (
  <div>
    <BS.Row>
      <BS.Col xs={4}>
        <Thumbnail src={snapshot} />
      </BS.Col>
      <BS.Col xs={8}>
        <OrderForm fields={fields} materials={materials} models={models} modelsIsFetching={modelsIsFetching} providers={providers}/>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={4}>
        <OrderEstimates estimates={fields.estimates}/>
      </BS.Col>
      <BS.Col xs={8}>
        <OrderRuns runs={runs}/>
        <OrderPrints prints={prints}/>
      </BS.Col>
    </BS.Row>
  </div>
)

const Order = ({ apiErrors, fields, handleSubmit, fetching, onDelete, materials, models, modelsIsFetching, prints, providers, runs, snapshot }) => (
  <BS.Form horizontal onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <Navigation fields={fields} onDelete={onDelete}/>

      <hr/>

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors}/>
        </BS.Col>
      </BS.Row>

      {fetching ?
        <Loader /> :
        <OrderContainer fields={fields} materials={materials} models={models} modelsIsFetching={modelsIsFetching} prints={prints} providers={providers} runs={runs} snapshot={snapshot} />
      }

    </BS.Grid>
  </BS.Form>
)

export default Order
