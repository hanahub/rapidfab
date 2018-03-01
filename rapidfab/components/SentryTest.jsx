import React, { Component } from 'react';

class SentryTest extends Component {
  componentWillMount() {
    throw new Error('SENTRY INTEGRATION TEST');
  }

  render() {
    return <p>Sentry Test</p>;
  }
}

export default SentryTest;
