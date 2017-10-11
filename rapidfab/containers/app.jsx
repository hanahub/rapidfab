import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import Config from 'rapidfab/config';
import { connect } from 'react-redux';
import Raven from 'raven-js';

import Navbar from 'rapidfab/components/navbar';
import Routes from 'rapidfab/routes';
import Router from 'rapidfab/components/router';

import { IntlProvider } from 'react-intl';
import BureauError from 'rapidfab/components/bureauError';
import * as Selectors from 'rapidfab/selectors';
import Tos from 'rapidfab/components/tos';

const SessionProvider = ({
  bureaus,
  children,
  currentUser,
  fetching,
  errors,
  onAcceptTerms,
  roles,
}) => {
  if (!currentUser && errors.length) {
    const next = window.location.hash.substr(1);
    window.location = `${Config.HOST
      .SCYLLA}?nextPath=${next}&subdomain=rapidfab#/login`;
  }

  if (currentUser && !fetching) {
    if (!currentUser.tos && !currentUser.impersonating) {
      return <Tos user={currentUser} onAcceptTerms={onAcceptTerms} />;
    }
    if (bureaus.size == 0) {
      return <BureauError bureaus={bureaus} />;
    }

    return <div>{children}</div>;
  }

  return <div />;
};

SessionProvider.propTypes = {
  children: PropTypes.element.isRequired,
  fetching: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAcceptTerms: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function redirect() {
  window.location = '/?nextPath=/&subdomain=rapidfab#/';
}

class App extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }
  render() {
    const {
      session,
      routes,
      onNavigate,
      onChangeLocale,
      onLogout,
      onAcceptTerms,
      url,
      i18n,
    } = this.props;

    return (
      <IntlProvider locale={i18n.locale} messages={i18n.messages}>
        <SessionProvider {...session} onAcceptTerms={onAcceptTerms}>
          <div>
            <Navbar
              currentUser={session.currentUser}
              bureaus={session.bureaus}
              locale={i18n.locale}
              onChangeLocale={onChangeLocale}
              onLogout={onLogout}
              session={session}
            />
            <Router routes={routes} onNavigate={onNavigate} hash={url.hash} />
          </div>
        </SessionProvider>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  onAcceptTerms: PropTypes.func.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  url: PropTypes.shape({ hash: PropTypes.string }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onNavigate: (currentHash, newHash) => {
      if (currentHash !== newHash) {
        dispatch(Actions.Url.change(currentHash, newHash));
      }
    },
    onChangeLocale: (currentLocale, newLocale) => {
      if (currentLocale !== newLocale) {
        dispatch(Actions.I18n.change(currentLocale, newLocale));
      }
    },
    onLogout: () => {
      dispatch(Actions.Api.pao.sessions.delete('')).then(redirect);
    },
    onInitialize: () => {
      dispatch(Actions.Api.pao.sessions.get('')).then(response => {
        Raven.setUserContext(response.json);
        Actions.EventStream.subscribe(dispatch, Config.HOST.EVENT);
        dispatch(Actions.Api.wyatt.bureau.list());
        dispatch(Actions.Api.wyatt.role.list());
      });
      dispatch(Actions.Api.pao.permissions.list({ namespace: 'pao' }));
      dispatch(Actions.Api.wyatt.bureau.list());
      dispatch(Actions.Api.wyatt.role.list());
    },
    onAcceptTerms: user => {
      dispatch(Actions.Api.pao.users.put(user.uuid, { tos: true })).then(() => {
        dispatch(Actions.Api.pao.sessions.get(''));
      });
    },
  };
}

function mapStateToProps(state) {
  const { url, i18n } = state;
  const bureaus = Selectors.getBureausCurrentUserRoles(state);
  const currentUser = Selectors.getSession(state);
  const permissions = Selectors.getPermissions(state);
  const roles = Selectors.getRolesCurrentUser(state);
  const fetching =
    !currentUser ||
    state.ui.wyatt.bureau.list.fetching ||
    state.ui.wyatt.role.list.fetching;

  const session = {
    bureaus,
    currentUser,
    permissions,
    roles,
    fetching,
    errors: [
      ...state.ui.pao.sessions.get.errors,
      ...state.ui.wyatt.bureau.list.errors,
    ],
  };
  return {
    session,
    url,
    i18n,
    routes: Routes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
