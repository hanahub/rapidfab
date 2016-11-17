import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import ConversionsComponent     from 'rapidfab/components/inventory/conversions'
import * as Selectors           from 'rapidfab/selectors'


class ConversionsContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <ConversionsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => dispatch(Actions.Api.wyatt["currency-conversion"].list()),
  }
}

function mapStateToProps(state) {
  const conversion = state.ui.wyatt["currency-conversion"]

  return {
    locations     : Selectors.getLocations(state),
    conversions   : Selectors.getConversions(state),
    users         : Selectors.getUsers(state),
    fetching      : conversion.list.fetching,
    apiErrors     : conversion.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversionsContainer)
