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

const NewOrder = props => (
  <BS.Grid fluid>
    <BreadCrumbs />
    <ApiErrors />
    <NewOrderForm
      fields={props.fields}
      materials={props.materials}
      providers={props.providers}
      handleSubmit={props.handleSubmit}
    />
  </BS.Grid>
)

export default NewOrder
