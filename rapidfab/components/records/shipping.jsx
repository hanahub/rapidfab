import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import {
  ButtonToolbar,
  ControlLabel,
  Col,
  FormControl,
  FormGroup,
  Grid,
  InputGroup,
  MenuItem,
  Row,
  SplitButton,
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import CostTooltip from 'rapidfab/components/CostTooltip';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const ShippingForm = ({ fields, handleSubmit, onDelete }) => (
  <form onSubmit={handleSubmit}>
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={['shipping', fields.id.value || 'New']} />
      <div className="clearfix">
        <ButtonToolbar className="pull-right">
          <SplitButton
            id="uxSaveDropdown"
            type="submit"
            bsStyle="success"
            bsSize="small"
            title={<SaveButtonTitle />}
            pullRight
          >
            <MenuItem
              eventKey={1}
              onClick={() => onDelete(fields.uuid.value)}
              disabled={!fields.id.value}
            >
              <Fa name="ban" />{' '}
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </MenuItem>
          </SplitButton>
        </ButtonToolbar>
      </div>

      <hr />

      <FlashMessages />

      <Row>
        <Col xs={12}>
          <FormGroup controlId="uxRegion">
            <FormGroup controlId="uxName">
              <ControlLabel>
                <FormattedMessage id="field.name" defaultMessage="Name" />:
              </ControlLabel>
              <FormControl type="text" required {...fields.name} />
            </FormGroup>
            <FormGroup controlId="uxDescription">
              <ControlLabel>
                <FormattedMessage
                  id="field.description"
                  defaultMessage="Description"
                />:
              </ControlLabel>
              <FormControl componentClass="textarea" {...fields.description} />
            </FormGroup>
            <ControlLabel>Region:</ControlLabel>
            <FormControl componentClass="select" required {...fields.region}>
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
            </FormControl>
          </FormGroup>
          <FormGroup controlId="uxCost">
            <ControlLabel>
              Cost: <CostTooltip />
            </ControlLabel>
            <InputGroup>
              <FormControl
                name="cost"
                type="number"
                required
                {...fields.cost}
              />
              <InputGroup.Addon>$</InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  </form>
);

ShippingForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ShippingForm;
