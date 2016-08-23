import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import UsersComponent           from 'rapidfab/components/inventory/users'


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
  } = state;

  return {
    records   : _.omit(users, ['uxFetching', 'uxErrors']),
    fetching  : users.uxFetching,
    errors    : users.uxErrors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
