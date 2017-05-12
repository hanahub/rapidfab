import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import TemplateComponent        from 'rapidfab/components/inventory/templates'
import * as Selectors           from 'rapidfab/selectors'


class TemplatesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <TemplateComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => dispatch(Actions.Api.wyatt.template.list()),
  }
}

function mapStateToProps(state) {
  const {
    template
  } = state.ui.wyatt

  return {
    locations     : Selectors.getLocations(state),
    templates     : Selectors.getTemplates(state),
    users         : Selectors.getUsers(state),
    fetching      : template.list.fetching,
    apiErrors     : template.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesContainer)
