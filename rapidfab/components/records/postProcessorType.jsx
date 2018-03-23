import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  InputGroup,
  MenuItem,
  Row,
  SplitButton,
} from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import CostTooltip from 'rapidfab/components/CostTooltip';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const PostProcessorTypeForm = ({
  fields,
  handleSubmit,
  onDelete,
  manufacturers,
  materials,
}) => (
  <form onSubmit={handleSubmit}>
    <Grid fluid>
      <BreadcrumbNav
        breadcrumbs={['postProcessorTypes', fields.id.value || 'New']}
      />

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
          <FormGroup controlId="uxName">
            <ControlLabel>
              <FormattedMessage id="field.name" defaultMessage="Name" />:
            </ControlLabel>
            <FormControl name="name" type="text" required {...fields.name} />
          </FormGroup>
          <FormGroup controlId="uxDescription">
            <ControlLabel>
              <FormattedMessage
                id="field.description"
                defaultMessage="Description"
              />:
            </ControlLabel>
            <FormControl
              name="description"
              type="text"
              {...fields.description}
            />
          </FormGroup>
          <FormGroup controlId="uxCost">
            <ControlLabel>
              <FormattedMessage
                id="field.costPerMinute"
                defaultMessage="Cost Per Minute"
              />:
              {` `}
              <CostTooltip />
            </ControlLabel>
            <InputGroup>
              <FormControl
                name="cost"
                type="number"
                {...fields.cost}
                required
              />
              <InputGroup.Addon>$</InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="uxDuration">
            <ControlLabel>Duration (seconds):</ControlLabel>
            <FormControl
              name="duration"
              type="number"
              required
              {...fields.duration}
            />
          </FormGroup>
          <FormGroup controlId="uxMaterials">
            <ControlLabel>
              <FormattedMessage
                id="field.materials"
                defaultMessage="Materials"
              />:
            </ControlLabel>
            <FormControl
              componentClass="select"
              multiple
              required
              {...fields.materials}
            >
              {materials.map(material => (
                <option key={material.uri} value={material.uri}>
                  {material.name}
                </option>
              ))}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="uxManufacturer">
            <ControlLabel>
              <FormattedMessage
                id="field.manufacturer"
                defaultMessage="Manufacturer"
              />:
            </ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="manufacturer"
              required
              {...fields.manufacturer}
            >
              <option key="placeholder" value="" selected disabled>
                Select a Manufacturer
              </option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.uri} value={manufacturer.uri}>
                  {manufacturer.name}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  </form>
);

PostProcessorTypeForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessorTypeForm;
