import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import UsersComponent           from 'rapidfab/components/inventory/users'
import * as Selectors           from 'rapidfab/selectors'


class UsersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <UsersComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.pao.users.list())
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
    apiErrors : users.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
