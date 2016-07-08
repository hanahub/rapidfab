import _     from 'lodash';
import React from 'react';
import PathToRegexp from 'path-to-regexp';

import Index         from 'rapidfab/components/index'
import About         from 'rapidfab/components/about'
import Manufacturers from 'rapidfab/components/manufacturer'

var Router = React.createClass({
  routes: {
    "/"             : Index,
    "/about"        : About,
    "/manufacturers" : Manufacturers,
  },
  render: function() {
    var toRender = null;
    for(var path in this.routes) {
      var element = this.routes[path];
      var keys = [];
      var pattern = PathToRegexp(path, keys);
      var match = pattern.exec(this.props.hash);
      if(match) {
        if(!!toRender) {
          console.warn("Matched more than one route. First route was", toRender.path, " this match is ", path);
        }
        var route = {};
        for(var i = 0; i < keys.length; i++) {
          let key = keys[i];
          route[key.name] = match[i+1];
        }
        var props = _.assign({}, this.props, {route: route});
        toRender = {
          element : React.createElement(element, props),
          path    : path
        }
      }
    }
    if(!toRender) {
      return (
        <div className="router">
          <p>You seem to have reached a link that doesn't go anywhere. Maybe you want <a href="#/">to go back to the beginning?</a></p>
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
});

var Routes = React.createClass({
  render: function() {
    var hash = this.props.url.location.hash.substr(1);

    return (
      <Router hash={hash} {...this.props}/>
    );
  }
});

module.exports = Routes
