import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import PostProcessorTypeComponent         from 'rapidfab/components/records/postProcessorType'
import Config                             from 'rapidfab/config'
import { reduxForm }                      from 'redux-form'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'materials',
  'manufacturer',
]

class PostProcessorTypeContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <PostProcessorTypeComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.manufacturer.list())
      if(uuid) {
        dispatch(Actions.Api.wyatt['post-processor-type'].get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt['post-processor-type'].put(payload.uuid, payload))
        window.location.hash = "#/inventory/post-processor-types"
      } else {
        dispatch(Actions.Api.wyatt['post-processor-type'].post(payload))
        window.location.hash = "#/inventory/post-processor-types"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt['postProcessor'].delete(uuid))
        window.location.hash = "#/inventory/post-processor-types"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const postProcessorType = state['post-processor-type']
  const {
    manufacturer,
    material,
  } = state;

  return {
    uuid               : props.route.uuid,
    initialValues      : postProcessorType[props.route.uuid],
    materials          : _.omit(material, ['uxFetching', 'uxErrors']),
    manufacturers      : _.omit(manufacturer, ['uxFetching', 'uxErrors']),
    submitting         : postProcessorType.uxFetching || material.uxFetching || manufacturer.uxFetching,
    apiErrors          : _.concat(postProcessorType.uxErrors, material.uxErrors, manufacturer.uxErrors)
  }
}

export default reduxForm({
  form: 'record.postProcessorType',
  fields
}, mapStateToProps, mapDispatchToProps)(PostProcessorTypeContainer)
