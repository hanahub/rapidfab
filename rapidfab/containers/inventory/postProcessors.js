import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import PostProcessorsComponent  from 'rapidfab/components/inventory/postProcessors'


class PostProcessorsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize()
  }
  render() {
    return <PostProcessorsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
      dispatch(Actions.Api.wyatt.location.list())
      dispatch(Actions.Api.wyatt['post-processor'].list())
    }
  }
}

function mapStateToProps(state) {
  const postProcessor = state['post-processor']
  const postProcessorType = state['post-processor-type']
  const {
    location,
  } = state;

  return {
    postProcessors     : _.omit(postProcessor,     ['uxFetching', 'uxErrors']),
    locations          : _.omit(location,          ['uxFetching', 'uxErrors']),
    postProcessorTypes : _.omit(postProcessorType, ['uxFetching', 'uxErrors']),
    fetching           : postProcessor.uxFetching || location.uxFetching || postProcessorType.uxFetching,
    apiErrors          : _.concat(postProcessor.uxErrors, location.uxErrors, postProcessorType.uxErrors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProcessorsContainer)
