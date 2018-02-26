import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

const SaveButtonTitle = ({ resourceName }) => (
  <span>
    <Fa name="floppy-o" />{' '}
    <FormattedMessage id="button.save" defaultMessage="Save" />
    {` `}
    {resourceName}
  </span>
);

SaveButtonTitle.defaultProps = { resourceName: null };
SaveButtonTitle.propTypes = { resourceName: PropTypes.string };

export default SaveButtonTitle;
