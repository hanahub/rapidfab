import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const ManufacturerForm = ({ fields, handleSubmit, onDelete, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav
        breadcrumbs={['manufacturers', fields.id.value || 'New']}
      />

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
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel>Name:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCommercialContact">
            <BS.ControlLabel>Commercial Contact:</BS.ControlLabel>
            <BS.FormControl
              name="commercialContact"
              type="text"
              required
              {...fields.contact.name}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCommercialPhone">
            <BS.ControlLabel>Commercial Phone:</BS.ControlLabel>
            <BS.FormControl
              name="commercialPhone"
              type="tel"
              required
              {...fields.contact.phone}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxSupportContact">
            <BS.ControlLabel>Support Contact:</BS.ControlLabel>
            <BS.FormControl
              name="supportContact"
              type="text"
              required
              {...fields.support.name}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxSupportPhone">
            <BS.ControlLabel>Support Phone:</BS.ControlLabel>
            <BS.FormControl
              name="supportPhone"
              type="tel"
              required
              {...fields.support.phone}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxAddress">
            <BS.ControlLabel>Address:</BS.ControlLabel>
            <BS.FormControl
              name="address"
              type="text"
              componentClass="textarea"
              required
              {...fields.address}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxNotes">
            <BS.ControlLabel>Notes:</BS.ControlLabel>
            <BS.FormControl
              name="notes"
              type="text"
              componentClass="textarea"
              required
              {...fields.notes}
            />
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

ManufacturerForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ManufacturerForm;
