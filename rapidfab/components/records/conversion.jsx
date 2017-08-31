import React from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';
import { Currencies } from 'rapidfab/constants';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const ConversionForm = ({
  fields,
  bureaus,
  handleSubmit,
  onDelete,
  apiErrors,
}) =>
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['currencies', fields.id.value || 'New']} />

      <div className="clearfix">
        <BS.ButtonToolbar className="pull-right">
          <BS.SplitButton
            id="uxSaveDropdown"
            type="submit"
            bsStyle="success"
            bsSize="small"
            title={<SaveButtonTitle />}
            pullRight
          >
            <BS.MenuItem
              eventKey={1}
              onClick={() => onDelete(fields.uuid.value)}
              disabled={!fields.id.value}
            >
              <Fa name="ban" />{' '}
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </BS.MenuItem>
          </BS.SplitButton>
        </BS.ButtonToolbar>
      </div>

      <hr />

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors} />
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxMultiplier">
            <BS.ControlLabel>Multiplier:</BS.ControlLabel>
            <BS.FormControl
              name="value"
              type="number"
              step="0.01"
              required
              {...fields.value}
            />
          </BS.FormGroup>

          <BS.FormGroup controlId="uxCurrency">
            <BS.ControlLabel>Currency:</BS.ControlLabel>
            <BS.FormControl componentClass="select" {...fields.currency}>
              <option key="placeholder" value="" selected disabled>
                Select a currency
              </option>
              {_.map(Currencies, currency =>
                <option key={currency} value={currency}>
                  {currency}
                </option>
              )}
            </BS.FormControl>
          </BS.FormGroup>

          <BS.FormGroup style={{ display: 'none' }} controlId="uxBureau">
            <BS.ControlLabel>
              <FormattedMessage id="field.bureau" defaultMessage="Bureau" />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              placeholder="bureau"
              {...fields.bureau}
            >
              {_.map(bureaus, bureau =>
                <option key={bureau.uri} value={bureau.uri}>
                  {bureau.uri}
                </option>
              )}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>;

export default ConversionForm;
