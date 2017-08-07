import React, { Component } from 'react';
import Version from 'rapidfab/version';

export default class About extends Component {
  render() {
    return (
      <dl>
        <dt>Version:</dt>
        <dd>{Version}</dd>
      </dl>
    );
  }
}
