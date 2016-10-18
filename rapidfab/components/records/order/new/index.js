import React, { PropTypes }     from "react"
import * as BS                  from 'react-bootstrap'
import _                        from "lodash"
import Fa                       from 'react-fontawesome'
import { FormattedMessage }     from 'react-intl'
import Error                    from 'rapidfab/components/error'
import NewOrderForm             from './form'

const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const BreadCrumbs = ({ fields }) => (
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
          <Fa name='object-ungroup'/> {fields.id.value || <FormattedMessage id="record.order.new" defaultMessage='New Order'/>}
        </BS.Breadcrumb.Item>
      </BS.Breadcrumb>
    </BS.Col>
  </BS.Row>
)

const NewOrder = ({ apiErrors, fields, handleSubmit, load, submitting, onDelete, materials, model, uploadModel, providers }) => (
  <div>
    <BreadCrumbs fields={fields} />
    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors}/>
      </BS.Col>
    </BS.Row>
    <form onSubmit={handleSubmit}>
      <BS.Grid fluid>
        <BS.Row>
          <BS.Col xs={6}>
            <BS.Button href="#/plan/orders" bsSize="small">
              <Fa name='arrow-left'/> <FormattedMessage id="inventory.orders" defaultMessage='Orders'/>
            </BS.Button>
          </BS.Col>
          <BS.Col xs={6}>
            <BS.ButtonToolbar className="pull-right">
              <BS.Button id="uxSave" type="submit" bsStyle="success" bsSize="small" disabled={uploadModel.percent > 0 ? true : false} pullRight>
                <SaveButtonTitle />
              </BS.Button>
            </BS.ButtonToolbar>
          </BS.Col>
        </BS.Row>

        <hr/>

        { uploadModel.percent > 0 ?
        <BS.ProgressBar active now={uploadModel.percent} /> :
        <NewOrderForm fields={fields} materials={materials} model={model} providers={providers} /> }

      </BS.Grid>
    </form>
  </div>
)

export default NewOrder
