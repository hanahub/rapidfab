import React from 'react';
import PropTypes from 'prop-types';

import Error from './error';
import Loading from './loading';

const Gatekeeper = ({ errors, loading, children }) => {
  if (errors.length > 0)
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
