import React from 'react';

const SentryTest = () => (
  <button
    onClick={() => {
      throw new Error('SENTRY INTEGRATION TEST');
    }}
  >
    Sentry Alert
  </button>
);

export default SentryTest;
