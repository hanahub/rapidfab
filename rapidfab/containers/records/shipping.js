import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import ShippingComponent                  from 'rapidfab/components/records/shipping'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uuid',
  'name',
  'description',
  'region',
  'cost',
]

class ShippingContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <ShippingComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/shipping"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.shipping.get(uuid))
      }
    },
    onSubmit: payload => {
      payload.bureau = Config.BUREAU
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.shipping.put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt.shipping.post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.shipping.delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.shipping"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.shipping")
  }
}

export default reduxForm({
  form: 'record.shipping',
  fields
}, mapStateToProps, mapDispatchToProps)(ShippingContainer)
