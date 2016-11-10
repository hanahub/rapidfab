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
        <BS.Breadcrumb.Item href="#/plan/orders">
          <Fa name='object-group'/> <FormattedMessage id="inventory.orders" defaultMessage='Orders'/>
        </BS.Breadcrumb.Item>
        <BS.Breadcrumb.Item>
          <Fa name='object-ungroup'/> <FormattedMessage id="record.order.new" defaultMessage='New Order'/>
        </BS.Breadcrumb.Item>
      </BS.Breadcrumb>
    </BS.Col>
  </BS.Row>
)

const ApiErrors = ({ apiErrors }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <Error errors={apiErrors}/>
    </BS.Col>
  </BS.Row>
)

const Pass = () => (
  <Fa name="check" style={{ color: SeriesStyle.Success.color }}/>
)

const Fail = () => (
  <Fa name="times" style={{ color: SeriesStyle.Danger.color }}/>
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

const ModelError = ({ model }) => (
  <BS.Row>
    <BS.Row>
      <BS.Col xsOffset={5} xs={2} style={{ textAlign: "center" }}>
        <Fa name="ban" size="5x" style={{ color: SeriesStyle.Danger.color }}/>
      </BS.Col>
    </BS.Row>
    <BS.Row>
      <BS.Col xsOffset={4} xs={4} style={{ textAlign: "center" }}>
        <h4><FormattedMessage id="orderFailure.header" defaultMessage="Unprintable model"/></h4>
        <FormattedMessage id="orderFailure.description" defaultMessage="Some of the printability checks listed below failed. Please correct them and try again."/>
      </BS.Col>
    </BS.Row>
    <BS.Row>
      <BS.Col xsOffset={4} xs={4} style={{ textAlign: "center" }}>
        <span>
          { model.analyses.manifold ? <Pass/> : <Fail/> }
          <FormattedMessage id="orderFailure.manifold" defaultMessage="Manifold"/>
        </span>
      </BS.Col>
    </BS.Row>
  </BS.Row>
)

const OrderForm = ({ props }) => (
    <NewOrderForm
      fields={props.fields}
      materials={props.materials}
      providers={props.providers}
      handleSubmit={props.handleSubmit}
    />
)

const Content = ({ props }) => {
  let model = props.model
  let uploadModel = props.uploadModel
  let percent = props.uploadModel.percent

  if(model && model.status === "processed" && !model.analyses.manifold) {
    return(<ModelError model={model}/>)
  } else if(uploadModel.uploading) {
    return(<Processing model={model} percent={percent}/>)
  } else {
    return(<OrderForm props={props}/>)
  }

}


const NewOrder = props => (
  <BS.Grid fluid>
    <BreadCrumbs />
    <ApiErrors />
    <Content props={props}/>
  </BS.Grid>
)

export default NewOrder
