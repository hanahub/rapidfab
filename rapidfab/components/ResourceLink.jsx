import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormControl } from 'react-bootstrap';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

const ResourceLink = ({ location, name }) => (
  <FormControl.Static>
    <a href={location}>{name}</a>
  </FormControl.Static>
);

ResourceLink.propTypes = {
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const uuid = extractUuid(ownProps.uri);
  const resource = state.resources.uuid;
  const location = `/#/records/${ownProps.endpoint}/${uuid}`;
  return { location, name: resource ? resource.name : ownProps.uri };
};

export default connect(mapStateToProps)(ResourceLink);
