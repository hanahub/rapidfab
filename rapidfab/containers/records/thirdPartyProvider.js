import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import ThirdPartyProviderComponent        from 'rapidfab/components/records/thirdPartyProvider'
import Config                             from 'rapidfab/config'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
]

class ThirdPartyProviderContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <ThirdPartyProviderComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt['third-party'].get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt['third-party'].put(payload.uuid, payload))
        window.location.hash = "#/inventory/third-party-providers"
      } else {
        dispatch(Actions.Api.wyatt['third-party'].post(payload))
        window.location.hash = "#/inventory/third-party-providers"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt['third-party'].delete(uuid))
        window.location.hash = "#/inventory/third-party-providers"
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.third-party"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.third-party"),
  }
}

export default reduxForm({
  form: 'record.third_party_provider',
  fields
}, mapStateToProps, mapDispatchToProps)(ThirdPartyProviderContainer)
