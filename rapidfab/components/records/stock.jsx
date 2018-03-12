import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';

const styles = {
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const StockForm = ({
  fields,
  handleSubmit,
  onDelete,
  locations,
  materials,
}) => {
  const selectedMaterial = materials.find(
    material => material.uri === fields.material.value
  );
  return (
    <form onSubmit={handleSubmit}>
      <BS.Grid fluid>
        <BreadcrumbNav
          breadcrumbs={['materialStocks', fields.id.value || 'New']}
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

        <FlashMessages />

        <BS.Row>
          <BS.Col xs={12} sm={6}>
            <BS.FormGroup controlId="uxMaterial">
              <BS.ControlLabel>
                <FormattedMessage
                  id="field.material"
                  defaultMessage="Material"
                />:
              </BS.ControlLabel>
              <BS.FormControl
                componentClass="select"
                required
                {...fields.material}
              >
                <option key="placeholder" value="" selected disabled>
                  Select a Material
                </option>
                {materials.map(material => (
                  <option key={material.uri} value={material.uri}>{`${
                    material.id
                  } - ${material.name}`}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
            <BS.FormGroup controlId="uxLocation">
              <BS.ControlLabel>
                <FormattedMessage
                  id="field.location"
                  defaultMessage="Location"
                />:
              </BS.ControlLabel>
              <BS.FormControl
                componentClass="select"
                required
                {...fields.location}
              >
                <option key="placeholder" value="" selected disabled>
                  Select a Location
                </option>
                {locations.map(location => (
                  <option key={location.uri} value={location.uri}>{`${
                    location.id
                  } - ${location.name}`}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
            <BS.FormGroup controlId="uxStatus">
              <BS.ControlLabel>
                <FormattedMessage id="field.status" defaultMessage="Status" />:
              </BS.ControlLabel>
              <BS.FormControl
                componentClass="select"
                required
                {...fields.status}
              >
                <option value="in-use">
                  <FormattedMessage id="status.inUse" defaultMessage="In Use" />
                </option>
                <option value="available">
                  <FormattedMessage
                    id="status.available"
                    defaultMessage="Available"
                  />
                </option>
                <option value="exhausted">
                  <FormattedMessage
                    id="status.exhausted"
                    defaultMessage="Exhausted"
                  />
                </option>
              </BS.FormControl>
            </BS.FormGroup>
            <BS.FormGroup controlId="uxQuantity">
              <BS.ControlLabel>
                <FormattedMessage
                  id="field.quantity"
                  defaultMessage="Quantity"
                />
                {selectedMaterial &&
                  selectedMaterial.units && (
                    <span>{` (${selectedMaterial.units})`}</span>
                  )}:
              </BS.ControlLabel>
              <BS.FormControl type="number" required {...fields.quantity} />
            </BS.FormGroup>
          </BS.Col>
          <BS.Col xs={12} sm={6}>
            {selectedMaterial && (
              <BS.Panel header={`Material Type: ${selectedMaterial.name}`}>
                <BS.ListGroup fill>
                  <BS.ListGroupItem style={styles.flexRow}>
                    <strong style={styles.flexRow}>Description</strong>
                    <span>{selectedMaterial.description}</span>
                  </BS.ListGroupItem>
                  <BS.ListGroupItem style={styles.flexRow}>
                    <strong style={styles.flexRow}>Units</strong>
                    <span>{selectedMaterial.units}</span>
                  </BS.ListGroupItem>
                </BS.ListGroup>
              </BS.Panel>
            )}
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    </form>
  );
};

StockForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StockForm;
