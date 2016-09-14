import _                            from "lodash"
import React, { Component }         from "react"
import Actions                      from 'rapidfab/actions'
import { connect }                  from 'react-redux'
import ThirdPartyProvidersComponent from 'rapidfab/components/inventory/thirdPartyProviders'
import * as Selectors               from 'rapidfab/selectors'
import Config                       from 'rapidfab/config'

class ThirdPartyProvidersContainer extends Component {
  componentDidMount() {
    this.props.onInitialize()
  }

  render() {
    return <ThirdPartyProvidersComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt['third-party'].list())
    }
  }
}

function mapStateToProps(state) {
  const third_party_providers = state.ui.wyatt['third-party']

  return {
    providers : Selectors.getThirdPartyProviders(state),
    fetching  : third_party_providers.list.fetching,
    errors    : _.concat(third_party_providers.list.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyProvidersContainer)
