import React, { Component, PropTypes }    from "react";
import { connect }                        from 'react-redux'
import _                                  from "lodash";
import Actions                            from "rapidfab/actions"
import ManufacturerComponent              from 'rapidfab/components/records/manufacturer'

class ManufacturerContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <ManufacturerComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => dispatch(Actions.Api.hoth.model.get(uuid)),
    onSubmit: (uuid, payload) => {
      if(uuid) {
        dispatch(Actions.Api.hoth.model.put(payload))
      } else {
        dispatch(Actions.Api.hoth.model.post(payload))
      }
    },
    onDelete: uuid => dispatch(Actions.Api.hoth.model.delete(uuid))
  }
}

function mapStateToProps(state, props) {
  const {
    model
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : model[props.route.uuid],
    fetching        : model.uxFetching,
    errors          : model.uxErrors,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerContainer)
