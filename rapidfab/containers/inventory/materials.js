import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import MaterialsComponent       from 'rapidfab/components/inventory/materials'
import * as Selectors           from 'rapidfab/selectors'


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
  } = state.ui.wyatt

  return {
    materials     : Selectors.getMaterials(state),
    manufacturers : Selectors.getManufacturers(state),
    fetching      : material.list.fetching || manufacturer.list.fetching,
    apiErrors     : _.concat(material.list.errors, manufacturer.list.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsContainer)
