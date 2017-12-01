import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PathToRegexp from 'path-to-regexp';
import NotFound from 'rapidfab/components/404';

class Router extends Component {
  componentWillMount() {
    window.onhashchange = event => {
      if (!event) return;
      this.props.onNavigate(this.props.hash, window.location.hash);
    };
  }

  componentWillUnmount() {
    window.onhashchange = null;
  }

  render() {
    const { routes } = this.props;
    let hash = this.props.hash || window.location.hash;
    if (hash && hash.startsWith('#')) {
      hash = hash.substr(1);
    }
    let toRender = null;

    Object.keys(routes).forEach(path => {
      const element = routes[path];
      const keys = [];
      const pattern = PathToRegexp(path, keys);
      const match = pattern.exec(hash);
      if (match) {
        if (toRender) {
          /* eslint-disable no-console */
          console.warn(
            'Matched more than one route. First route was',
            toRender.path,
            ' this match is ',
            path
          );
          /* eslint-enable no-console */
        }
        const route = {};
        keys.forEach((key, index) => {
          route[key.name] = match[index + 1];
        });
        const props = {
          route,
        };
        toRender = {
          element: React.createElement(element, props),
          path,
        };
      }
    });
    if (!toRender) {
      return (
        <div className="router">
          <NotFound />
        </div>
      );
    }
    return <div className="router">{toRender.element}</div>;
  }
}

Router.propTypes = {
  routes: PropTypes.shape({}).isRequired,
  hash: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Router;
