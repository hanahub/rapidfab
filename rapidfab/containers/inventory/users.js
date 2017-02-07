import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import UsersComponent           from 'rapidfab/components/inventory/users'
import * as Selectors           from 'rapidfab/selectors'
import Config                   from 'rapidfab/config'


class UsersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.bureau)
  }

  render() {
    return <UsersComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.pao.users.list({
        group: bureau.group
      }))
    }
  }
}

function mapStateToProps(state) {
  const {
    users,
  } = state.ui.pao

  return {
    records   : Selectors.getUsers(state),
    fetching  : users.list.fetching,
    apiErrors : users.list.errors,
    bureau    : Selectors.getBureau(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
