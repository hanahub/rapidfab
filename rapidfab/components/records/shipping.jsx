import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const ShippingForm = ({ fields, handleSubmit, onDelete, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['shipping', fields.id.value || 'New']} />
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
          <BS.FormGroup controlId="uxRegion">
            <BS.FormGroup controlId="uxName">
              <BS.ControlLabel>
                <FormattedMessage id="field.name" defaultMessage="Name" />:
              </BS.ControlLabel>
              <BS.FormControl type="text" required {...fields.name} />
            </BS.FormGroup>
            <BS.FormGroup controlId="uxDescription">
              <BS.ControlLabel>
                <FormattedMessage
                  id="field.description"
                  defaultMessage="Description"
                />:
              </BS.ControlLabel>
              <BS.FormControl
                componentClass="textarea"
                {...fields.description}
              />
            </BS.FormGroup>
            <BS.ControlLabel>Region:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.region}>
              <option key="placeholder" value="" selected disabled>
                Select a Region
              </option>
              <option value="africa">Africa</option>
              <option value="antarctica">Antarctica</option>
              <option value="asia">Asia</option>
              <option value="australia">Australia</option>
              <option value="europe">Europe</option>
              <option value="north-america">North America</option>
              <option value="south-america">South America</option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCost">
            <BS.ControlLabel>Cost:</BS.ControlLabel>
            <BS.FormControl
              name="cost"
              type="number"
              required
              {...fields.cost}
            />
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

ShippingForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShippingForm;
