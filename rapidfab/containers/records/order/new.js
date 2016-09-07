import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import { extractUuid }                    from 'rapidfab/reducers/makeApiReducers'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import NewComponent                       from 'rapidfab/components/records/order/new'
import { reduxForm }                      from 'redux-form'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'model',
]

class NewContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <NewComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.order.get(uuid))
      }
    },
    onSubmit: payload => {
      dispatch(Actions.Api.hoth.model.post(payload))
      .then( args => window.location.hash = '#/records/order/edit/${extractUuid(args.headers.location})')
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.order.delete(uuid))
        window.location.hash = "#/inventory/orders"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    order,
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : order[props.route.uuid],
    manufacturers   : _.omit(manufacturer, ['uxFetching', 'uxErrors']),
  }
}

export default reduxForm({
  form: 'record.new',
  fields
}, mapStateToProps, mapDispatchToProps)(NewContainer)
