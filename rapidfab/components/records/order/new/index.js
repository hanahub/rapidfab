import React, { PropTypes, Component }     from "react"
import * as BS                  from 'react-bootstrap'
import _                        from "lodash"
import Fa                       from 'react-fontawesome'
import { FormattedMessage }     from 'react-intl'
import Error                    from 'rapidfab/components/error'
import NewOrderForm             from './form'
import Chart, { SeriesStyle }   from 'rapidfab/components/chart'

const BreadCrumbs = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.Breadcrumb>
        <BS.Breadcrumb.Item active={true}>
          <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
        </BS.Breadcrumb.Item>
        <BS.Breadcrumb.Item href="#/plan/orders">
          <Fa name='files-o'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
        </BS.Breadcrumb.Item>
        <BS.Breadcrumb.Item href="#/records/order">
          <Fa name='file-o'/> <FormattedMessage id="record.order.new" defaultMessage='New Order'/>
        </BS.Breadcrumb.Item>
      </BS.Breadcrumb>
    </BS.Col>
  </BS.Row>
)

const Errors = ({ errors }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <Error errors={errors}/>
    </BS.Col>
  </BS.Row>
)

const Processing = ({ model, percent }) => {
  const statusStyleMapping = {
    "not-uploaded": "primary",
    processing: "info",
    processed: "success",
  }
  const statusDisplayMapping = {
    "not-uploaded"   : <FormattedMessage id="status.uploading" defaultMessage='Uploading'/>,
    processing  : <FormattedMessage id="status.processing" defaultMessage='Processing'/>,
    processed   : <FormattedMessage id="status.complete" defaultMessage='Complete'/>,
  }
  let status = model ? model.status : "not-uploaded"
  if(percent >= 100) {
    status = "processing"
  }
  return (
    <BS.Row>
      <BS.Col xsOffset={2} xs={8}>
        <BS.ProgressBar
          striped
          bsStyle={statusStyleMapping[status]}
          now={percent}
          active={status === "processing"}
        />
      </BS.Col>
      <BS.Col xsOffset={2} xs={8} style={{ textAlign: "center" }}>
        <h4>{statusDisplayMapping[status]}</h4>
      </BS.Col>
    </BS.Row>
  )
}

const OrderForm = ({ props }) => (
    <NewOrderForm
      fields={props.fields}
      bureau={props.bureau}
      materials={props.materials}
      providers={props.providers}
      shippings={props.shippings}
      postProcessorTypes={props.postProcessorTypes}
      onSubmit={props.onSubmit}
    />
)

const Content = ({ props }) => {
  let model = props.model
  let uploadModel = props.uploadModel
  let percent = props.uploadModel.percent

  if(uploadModel.uploading && props.combinedErrors.length) {
    return(<div/>)
  } else if(uploadModel.uploading) {
    return(<Processing model={model} percent={percent}/>)
  } else {
    return(<OrderForm props={props}/>)
  }

}

const NewOrder = props => (
  <BS.Grid fluid>
    <BreadCrumbs />
    <Errors errors={props.combinedErrors}/>
    <Content props={props}/>
  </BS.Grid>
)

export default NewOrder
