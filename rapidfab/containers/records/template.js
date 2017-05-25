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
      //TODO use the best way to CRUD these resources, the other method is in the component
      if(payload.process_steps) {
        _.map(pay.load.process_steps, step => {
          if(step.uuid) {
            dispatch(Actions.Api.wyatt["process-step"].put(step.uuid, payload))
          } else {
            dispatch(Actions.Api.wyatt.template.post(payload)).then(redirect)
          }
        })
      }

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
    },
    onDuplicate: templateCopy => {
      const { bureau, name, steps } = templateCopy;
      const stepCopies = steps.map( step => {
        const step_data = _.omit(step, ['step_position', 'template']);
        return new Promise((resolve) => {
          dispatch(Actions.Api.wyatt["process-step"].post(step_data))
            .then( response => resolve(response.payload.uri) )
        });
      });
      Promise.all(stepCopies).then(process_steps => {
        const payload = {
          bureau,
          name,
          process_steps,
        }
        dispatch(Actions.Api.wyatt.template.post(payload)).then(redirect);
      });
    }
  }
}

function mapStateToProps(state, props) {
  const templateResource = Selectors.getRouteResource(state, props)
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    bureau          : Selectors.getBureau(state),
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
