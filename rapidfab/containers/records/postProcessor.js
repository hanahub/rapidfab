import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import PostProcessorComponent             from 'rapidfab/components/records/postProcessor'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'duration',
  'location',
  'post_processor_type',
]

class PostProcessorContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <PostProcessorComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/post-processors"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.location.list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
      if(uuid) {
        dispatch(Actions.Api.wyatt['post-processor'].get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt['post-processor'].put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt['post-processor'].post(payload)).then(redirect)
      }
    },
    onDelete: uuid => dispatch(Actions.Api.wyatt['post-processor'].delete(uuid)).then(redirect)
  }
}

function mapStateToProps(state, props) {
  return {
    uuid                : Selectors.getRoute(state, props).uuid,
    initialValues       : Selectors.getRouteResource(state, props),
    submitting          : Selectors.getResourceFetching(state, "wyatt.post-processor"),
    apiErrors           : Selectors.getResourceErrors(state, "wyatt.post-processor"),
    locations           : Selectors.getLocations(state),
    postProcessorTypes  : Selectors.getPostProcessorTypes(state),
  }
}

export default reduxForm({
  form: 'record.postProcessor',
  fields
}, mapStateToProps, mapDispatchToProps)(PostProcessorContainer)
