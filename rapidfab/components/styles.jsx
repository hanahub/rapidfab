import React from 'react';
import * as BS from 'react-bootstrap';

const Home = () => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Alert bsStyle="success">
        <p>Something good was successful!</p>
      </BS.Alert>
      <BS.Alert bsStyle="info">
        <p>This is for your information only!</p>
      </BS.Alert>
      <BS.Alert bsStyle="warning">
        <p>Warning, something bad could happen</p>
      </BS.Alert>
      <BS.Alert bsStyle="danger" className="error-alert">
        <p>This is a test error. It is only a test</p>
      </BS.Alert>
    </BS.Row>
  </BS.Grid>
);

export default Home;
