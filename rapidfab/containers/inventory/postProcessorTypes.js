import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import PostProcessorTypesComponent  from 'rapidfab/components/inventory/postProcessorTypes'


class PostProcessorTypesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }
  render() {
    return <PostProcessorTypesComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.manufacturer.list())
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
    }
  }
}

function mapStateToProps(state) {
  const postProcessorType = state['post-processor-type']
  const {
    manufacturer,
    material,
  } = state;

  return {
    manufacturers      : _.omit(manufacturer,     ['uxFetching', 'uxErrors']),
    materials          : _.omit(material,          ['uxFetching', 'uxErrors']),
    postProcessorTypes : _.omit(postProcessorType, ['uxFetching', 'uxErrors']),
    fetching           : manufacturer.uxFetching || material.uxFetching || postProcessorType.uxFetching,
    apiErrors : _.concat(postProcessorType.uxErrors, manufacturer.uxErrors, material.uxErrors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProcessorTypesContainer)
