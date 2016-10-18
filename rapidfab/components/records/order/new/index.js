import React, { PropTypes, Component }     from "react"
import * as BS                  from 'react-bootstrap'
import _                        from "lodash"
import Fa                       from 'react-fontawesome'
import { FormattedMessage }     from 'react-intl'
import Error                    from 'rapidfab/components/error'
import NewOrderForm             from './form'

const BreadCrumbs = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.Breadcrumb>
        <BS.Breadcrumb.Item>
          <Fa name='book'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
        </BS.Breadcrumb.Item>
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

const NewOrder = props => (
  <BS.Grid fluid>
    <BreadCrumbs />
    <ApiErrors />
    { props.uploadModel.uploading ? (
      <Processing percent={props.uploadModel.percent} model={props.model} />
    ) : (
      <NewOrderForm
        fields={props.fields}
        materials={props.materials}
        providers={props.providers}
        handleSubmit={props.handleSubmit}
      />
    ) }
  </BS.Grid>
)

export default NewOrder
