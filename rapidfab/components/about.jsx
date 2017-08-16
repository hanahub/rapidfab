import React, { Component } from 'react';
import Version from 'rapidfab/version';

const About = () => (
  <dl>
    <dt>Version:</dt>
    <dd>{Version}</dd>
  </dl>
);

export default About;
