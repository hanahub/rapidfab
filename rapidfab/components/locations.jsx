import React from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

const Locations = injectIntl(
  ({ locationFilter, locations, handleOnChange, intl }) => (
    <BS.Form inline>
      <BS.FormGroup>
        <BS.ControlLabel>
          <FormattedMessage id="field.location" defaultMessage="Location" />
        </BS.ControlLabel>{' '}
        <BS.FormControl
          onChange={e => {
            handleOnChange(e.target.value);
          }}
          defaultValue={locationFilter || ''}
          componentClass="select"
        >
          <option key="placeholder" value="">
            {intl.formatMessage({
              id: 'field.location.all',
              defaultMessage: 'All',
            })}
          </option>
          {_.map(locations, location => (
            <option
              key={location.uri}
              value={location.uri}
            >{`${location.id} - ${location.name}`}</option>
          ))}
          <option key="unassigned" value="unassigned">
            {intl.formatMessage({
              id: 'field.location.unassigned',
              defaultMessage: 'Unassigned',
            })}
          </option>
        </BS.FormControl>
      </BS.FormGroup>
    </BS.Form>
  )
);

export default Locations;
