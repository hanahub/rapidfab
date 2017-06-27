import React from 'react';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

const SaveButtonTitle = () => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
);

export default SaveButtonTitle;
