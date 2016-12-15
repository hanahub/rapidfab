import _                                 from 'lodash';
import React, { Component, PropTypes }   from 'react';
import PathToRegexp                      from 'path-to-regexp';
import NotFound                          from 'rapidfab/components/404'


class Router extends Component {
  componentWillMount() {
    window.onhashchange = event => {
      if(!event) return;
      this.props.onNavigate(this.props.hash, window.location.hash);
    }
  }

  componentWillUnmount() {
    window.onhashchange = null;
  }

  render() {
    const { routes } = this.props;
    let hash = this.props.hash || window.location.hash;
    if(hash && hash.startsWith("#")) {
      hash = hash.substr(1);
    }
    let toRender = null;

    for(let path in routes) {
      let element = routes[path];
      let keys = [];
      let pattern = PathToRegexp(path, keys);
      let match = pattern.exec(hash);
      if(match) {
        if(!!toRender) {
          console.warn("Matched more than one route. First route was", toRender.path, " this match is ", path);
        }
        let route = {};
        for(let i = 0; i < keys.length; i++) {
          let key = keys[i];
          route[key.name] = match[i+1];
        }
        let props = {
          route
        };
        toRender = {
          element : React.createElement(element, props),
          path    : path
        }
      }
    }
    if(!toRender) {
      return (
        <div className="router">
          <NotFound />
        </div>
      );
    } else {
      return (
        <div className="router">
          {toRender.element}
        </div>
      );
    }
  }
}

Router.propTypes = {
  routes: PropTypes.object.isRequired,
  hash: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
}

export default Router
