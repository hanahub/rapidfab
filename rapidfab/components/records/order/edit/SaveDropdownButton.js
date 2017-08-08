import React from 'react';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap';

const SaveButtonTitle = () => (
  <span>
    <Fa name="floppy-o" /> <FormattedMessage id="button.save" defaultMessage="Save" />
  </span>
);

const SaveDropdownButton = ({
  onSubmit = () => {},
  onDelete = () => {},
}) => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <SplitButton
        id="actions"
        type="submit"
        bsStyle="success"
        bsSize="small"
        title={<SaveButtonTitle />}
        onClick={onSubmit}
      >
        <MenuItem
          eventKey={1}
          onClick={onDelete}
        >
          <Fa name="ban" />
          <FormattedMessage id="button.delete" defaultMessage="Delete" />
        </MenuItem>
      </SplitButton>
    </div>
  </ButtonToolbar>
);

export default SaveDropdownButton;
