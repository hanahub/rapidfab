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

import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const SaveTooltip = <Tooltip id="saved">Saved</Tooltip>;

const SaveDropdownButton = ({ onCancel, onDelete, onSubmit }) => (
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
          {onCancel && (
            <MenuItem eventKey={0} onClick={onCancel}>
              <Fa name="ban" />
              {` `}
              <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
            </MenuItem>
          )}
          <MenuItem eventKey={1} onClick={onDelete}>
            <Fa name="times" />
            {` `}
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </MenuItem>
        </SplitButton>
      </OverlayTrigger>
    </div>
  </ButtonToolbar>
);

SaveDropdownButton.defaultProps = {
  onCancel: null,
};

SaveDropdownButton.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SaveDropdownButton;
