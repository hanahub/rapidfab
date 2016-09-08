import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import MaterialsComponent       from 'rapidfab/components/inventory/materials'


class MaterialsContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <MaterialsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.manufacturer.list())
      dispatch(Actions.Api.wyatt.material.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    material,
    manufacturer
  } = state;

  return {
    materials     : _.omit(material, ['uxFetching', 'uxErrors']),
    manufacturers : _.omit(manufacturer, ['uxFetching', 'uxErrors']),
    fetching      : material.uxFetching || manufacturer.uxFetching,
    apiErrors     : _.concat(material.uxErrors, manufacturer.uxErrors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsContainer)
