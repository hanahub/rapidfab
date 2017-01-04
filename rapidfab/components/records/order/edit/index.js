import React, { PropTypes }   from "react"
import * as BS                from 'react-bootstrap'
import Fa                     from 'react-fontawesome'
import { FormattedMessage }   from 'rapidfab/i18n'
import OrderForm              from './form'
import OrderEstimates         from './estimates'
import OrderPrints            from './prints'
import OrderRuns              from './runs'
import Error                  from 'rapidfab/components/error'
import NotFound               from 'rapidfab/components/404'
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
          <BS.Breadcrumb.Item active={true}>
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

const OrderContainer = (props) => (
  <div>
    <BS.Row>
      <BS.Col xs={4}>
        <Thumbnail src={props.snapshot} />
      </BS.Col>
      <BS.Col xs={8}>
        <OrderForm
          fields={props.fields}
          materials={props.materials}
          models={props.models}
          modelsIsFetching={props.modelsIsFetching}
          providers={props.providers}
          shippings={props.shippings}
          postProcessorTypes={props.postProcessorTypes}
          statusOptions={props.statusOptions}
        />
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={4}>
        <OrderEstimates
          estimates={props.fields.estimates}
          currency={props.fields.currency}
        />
      </BS.Col>
      <BS.Col xs={8}>
        <OrderRuns runs={props.runs}/>
        <OrderPrints prints={props.prints}/>
      </BS.Col>
    </BS.Row>
  </div>
)

const Order = (props) => {
  let notFound = false
  if(props.order.get.errors.length != 0) {
    _.forEach(props.order.get.errors, (error) => {
      if(error.title === "Failed to fetch") {
        notFound = true
      }
    })
  }

  if(notFound) {
    return(<NotFound />)
  } else {
    return(
      <BS.Form horizontal onSubmit={props.handleSubmit}>
        <BS.Grid fluid>
          <Navigation fields={props.fields} onDelete={props.onDelete}/>

          <hr />

          <BS.Row>
            <BS.Col xs={12}>
              <Error errors={props.apiErrors}/>
            </BS.Col>
          </BS.Row>

          {props.fetching ?
            <Loader /> :
            <OrderContainer {...props}/>
          }

        </BS.Grid>
      </BS.Form>
    )
  }
}

export default Order
