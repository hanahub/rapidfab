import React from 'react';

const About = () => (
  <div>
    <dl>
      <dt>Commit hash:</dt>
      <dd>{process.env.COMMIT_HASH}</dd>
    </dl>
    <dl>
      <dt>Git describe:</dt>
      <dd>{process.env.GITDESCRIBE}</dd>
    </dl>
    <dl>
      <dt>Node environment:</dt>
      <dd>{process.env.NODE_ENV}</dd>
    </dl>
  </div>
);

export default About;
