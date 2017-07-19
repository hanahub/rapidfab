import React from 'react';
import PropTypes from 'prop-types';

import Error from './error';
import Loading from './Loading';

const Gatekeeper = ({ errors = [], loading = false, children }) => {
  if (errors.length)
    return <Error errors={errors} />
  else if (loading)
    return <Loading />
  else
    return children
};

Gatekeeper.propTypes = {
  errors: PropTypes.array,
  loading: PropTypes.bool,
  children: PropTypes.element,
}

export default Gatekeeper;
