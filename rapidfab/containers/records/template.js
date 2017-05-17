import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import TemplateComponent                  from 'rapidfab/components/records/template'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uuid',
  'name',
  'description',
  'region',
  'cost',
  'bureau',
]

class TemplateContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <TemplateComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/templates"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.template.get(uuid))
        dispatch(Actions.Api.wyatt["process-step"].list())
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.template.put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt.template.post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.template.delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  const templateResource   = Selectors.getRouteResource(state, props)

  return {
    uuid            : templateResource.uuid,
    initialValues   : Selectors.getInitialValuesBureau(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.template"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.template"),
    steps           : Selectors.getStepsForTemplate(state, templateResource)
  }
}

export default reduxForm({
  form: 'record.template',
  fields
}, mapStateToProps, mapDispatchToProps)(TemplateContainer)
