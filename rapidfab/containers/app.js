import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import Config                           from 'rapidfab/config'
import { connect }                      from 'react-redux'

import Navbar                           from 'rapidfab/components/navbar'
import Error                            from 'rapidfab/components/error'
import Routes                           from 'rapidfab/routes'
import Router                           from 'rapidfab/components/router'

import { IntlProvider }                 from 'react-intl'
import i18n                             from 'rapidfab/i18n'

const SessionProvider = ({ children, currentUser, fetching, errors}) => {
  if(!currentUser && errors) {
    window.location = `${Config.HOST.SCYLLA}#/login`
  }

  if(currentUser) {
    return (
      <div>
        {children}
      </div>
    )
  }

  return <div/>
}

class App extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }
  render() {
    const {
      session,
      routes,
      onNavigate,
      onChangeLocale,
      url,
      i18n
    } = this.props;
    return (
      <IntlProvider
        locale={i18n.locale}
        messages={i18n.messages}
      >
        <SessionProvider {...session}>
          <Navbar
            onChangeLocale={onChangeLocale}
            locale={i18n.locale}
            currentUser={session.currentUser}
          />
          <Router
            routes={routes}
            onNavigate={onNavigate}
            hash={url.hash}
          />
        </SessionProvider>
      </IntlProvider>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onNavigate: (currentHash, newHash) => {
      if(currentHash !== newHash) {
        dispatch(Actions.Url.change(currentHash, newHash))
      }
    },
    onChangeLocale: (currentLocale, newLocale) => {
      if(currentLocale !== newLocale) {
        dispatch(Actions.I18n.change(currentLocale, newLocale))
      }
    },
    onInitialize: () => {
      dispatch(Actions.Api.pao.sessions.get(''))
    }
  }
}

function mapStateToProps(state) {
  const routes = Routes;
  const {
    sessions,
    url,
    i18n
  } = state;
  const currentUsers = _.omit(sessions, ['uxFetching', 'uxErrors'])
  const session = {
    currentUser : _.find(currentUsers, user => !!user.uri),
    fetching    : sessions.uxFetching,
    errors      : sessions.uxErrors
  }
  return {
    session,
    url,
    i18n,
    routes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
