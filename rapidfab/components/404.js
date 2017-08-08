import React, { Component } from 'react';
import Version from 'rapidfab/version';

export default class NotFound extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>404</h1>
        <p>You seem to have reached a link that doesn't go anywhere. Maybe you want <a href="#/">to go back to the beginning?</a></p>
      </div>
    );
  }
}
