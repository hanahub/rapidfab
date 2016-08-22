import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import PostProcessorComponent             from 'rapidfab/components/records/postProcessor'
import { reduxForm }                      from 'redux-form'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
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
        dispatch(Actions.Api.wyatt['post-processor'].put(payload)).then(
          () => window.location.hash = "#/inventory/post-processors"
        )
      } else {
        dispatch(Actions.Api.wyatt['post-processor'].post(payload)).then(
          () => window.location.hash = "#/inventory/post-processors"
        )
      }
    },
    onDelete: uuid => dispatch(Actions.Api.wyatt['post-processor'].delete(uuid)).then(
      () => window.location.hash = "#/inventory/post-processors"
    )
  }
}

function mapStateToProps(state, props) {
  const postProcessor = state['post-processor']
  const postProcessorType = state['post-processor-type']
  const {
    location,
  } = state;

  return {
    uuid               : props.route.uuid,
    initialValues      : postProcessor[props.route.uuid],
    locations          : _.omit(location, ['uxFetching', 'uxErrors']),
    postProcessorTypes : _.omit(postProcessorType, ['uxFetching', 'uxErrors']),
  }
}

export default reduxForm({
  form: 'record.postProcessor',
  fields
}, mapStateToProps, mapDispatchToProps)(PostProcessorContainer)
