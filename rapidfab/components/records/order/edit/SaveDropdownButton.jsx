import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import {
  ButtonToolbar,
  MenuItem,
  OverlayTrigger,
  SplitButton,
  Tooltip,
} from 'react-bootstrap';

const SaveButtonTitle = () => (
  <span>
    <Fa name="floppy-o" />{' '}
    <FormattedMessage id="button.save" defaultMessage="Save" />
  </span>
);

const SaveTooltip = <Tooltip id="saved">Saved</Tooltip>;

const SaveDropdownButton = ({ onSubmit, onDelete }) => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <OverlayTrigger
        delay={1000}
        trigger="click"
        placement="bottom"
        overlay={SaveTooltip}
        rootClose
      >
        <SplitButton
          id="actions"
          type="submit"
          bsStyle="success"
          bsSize="small"
          title={<SaveButtonTitle />}
          onClick={onSubmit}
        >
          <MenuItem eventKey={1} onClick={onDelete}>
            <Fa name="ban" />
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </MenuItem>
        </SplitButton>
      </OverlayTrigger>
    </div>
  </ButtonToolbar>
);

SaveDropdownButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SaveDropdownButton;
