import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Button, Form, FormControl, InputGroup, Label } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import Config from 'rapidfab/config';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';

import Feature from 'rapidfab/components/Feature';
import FormRow from 'rapidfab/components/FormRow';
import SaveDropdownButton from './SaveDropdownButton';

const ResourceLink = ({ href }) => (
  <a href={href}>
    Go <Fa name="external-link" />
  </a>
);

ResourceLink.propTypes = { href: PropTypes.string.isRequired };

const statusOptionsMap = {
  pending: ['cancelled', 'confirmed'],
  confirmed: ['cancelled'],
  printing: ['cancelled'],
  printed: ['cancelled', 'shipping', 'complete'],
  shipping: ['cancelled', 'complete'],
};

const Printable = ({ models, uri, itar }) => {
  const model = models.find(m => m.uri === uri);
  let printable = true;

  if (model && model.analyses && !model.analyses.manifold) {
    printable = false;
  }

  if (model && printable) {
    return (
      <Label bsStyle="success">
        <FormattedMessage id="field.printable" defaultMessage="Printable" />
      </Label>
    );
  } else if ((model && !printable) || itar) {
    return (
      <Label bsStyle="warning">
        <FormattedMessage id="field.unknown" defaultMessage="Unknown" />
      </Label>
    );
  }
  return (
    <Label bsStyle="info">
      <FormattedMessage id="field.loading" defaultMessage="Loading" />
    </Label>
  );
};

Printable.defaultProps = { itar: false };

Printable.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  uri: PropTypes.string.isRequired,
  itar: PropTypes.bool,
};

const LineItemEditForm = ({
  handleFileChange,
  handleFileRemove,
  handleInputChange,
  handleLayerThicknessBlur,
  handleModelDownload,
  isRestricted,
  layerThickness,
  lineItem,
  models,
  modelUnits,
  modelUpload,
  notes,
  baseMaterial,
  baseMaterialColor,
  baseMaterials,
  onSubmit,
  onDelete,
  providers,
  quantity,
  status,
  supportMaterial,
  supportMaterialColor,
  supportMaterials,
  template,
  templates,
  thirdPartyProvider,
}) => {
  const currentModel = models.find(model => model.uri === lineItem.model);
  const statusOptions = statusOptionsMap[lineItem.status];
  return (
    <Form horizontal>
      <SaveDropdownButton
        onSubmit={onSubmit}
        onDelete={onDelete}
        resourceName="Line Item"
      />
      <FormRow id="field.printable" defaultMessage="Printable">
        <FormControl.Static>
          <Printable
            models={models}
            uri={lineItem.model}
            itar={lineItem.itar}
          />
        </FormControl.Static>
      </FormRow>

      <FormRow id="field.status" defaultMessage="Status">
        {isRestricted ? (
          <FormControl.Static>{ORDER_STATUS_MAP[status]}</FormControl.Static>
        ) : (
          <FormControl
            name="status"
            componentClass="select"
            onChange={handleInputChange}
            value={status}
            required
          >
            <option value={status}>{ORDER_STATUS_MAP[status]}</option>
            {statusOptions
              ? statusOptions.map(statusOption => (
                  <option key={statusOption} value={statusOption}>
                    {ORDER_STATUS_MAP[statusOption]}
                  </option>
                ))
              : null}
          </FormControl>
        )}
      </FormRow>

      {lineItem.itar ? null : (
        <div>
          <FormRow id="field.model" defaultMessage="Model">
            <div>
              {currentModel ? (
                <a onClick={handleModelDownload} role="button" tabIndex={0}>
                  {currentModel.name}
                </a>
              ) : (
                <Fa name="spinner" spin />
              )}
            </div>
          </FormRow>
          <FormRow id="modelUnits" defaultMessage="Model Units">
            <FormControl
              disabled={modelUpload}
              name="modelUnits"
              value={modelUnits}
              componentClass="select"
              onChange={handleInputChange}
              required
            >
              <option value="auto">
                <FormattedMessage id="automatic" defaultMessage="Automatic" />
              </option>
              <option value="in">
                <FormattedMessage id="inches" defaultMessage="Inches" />
              </option>
              <option value="mm">
                <FormattedMessage
                  id="millimeters"
                  defaultMessage="Millimeters"
                />
              </option>
            </FormControl>
          </FormRow>
          <FormRow id="field.replaceModel" defaultMessage="Replace Model">
            {modelUpload ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {modelUpload.name}
                {` `}
                <Button
                  bsSize="xsmall"
                  bsStyle="danger"
                  onClick={handleFileRemove}
                >
                  <Fa name="times" />
                </Button>
              </div>
            ) : (
              <FormControl
                name="model"
                type="file"
                accept=".stl"
                required
                onChange={handleFileChange}
              />
            )}
          </FormRow>
        </div>
      )}

      <FormRow id="field.layer_thickness" defaultMessage="Layer Thickness">
        <FormControl
          min="0.2"
          max="1"
          maxLength="4"
          name="layerThickness"
          onBlur={handleLayerThicknessBlur}
          onChange={handleInputChange}
          precision="2"
          require
          step="0.05"
          type="number"
          value={layerThickness}
        />
      </FormRow>

      <FormRow id="field.quantity" defaultMessage="Quantity">
        <FormControl
          name="quantity"
          value={quantity}
          type="number"
          onChange={handleInputChange}
          required
        />
      </FormRow>

      <Feature featureName="traveler">
        <FormRow id="traveler" defaultMessage="Traveler">
          <a
            href={`${Config.HOST.WYATT}/traveler/?line_item=${lineItem.uri}`}
            target="_blank"
            type="download"
          >
            <FormattedMessage id="button.download" defaultMessage="Download" />
          </a>
        </FormRow>
      </Feature>

      <FormRow id="field.baseMaterial" defaultMessage="Base Material">
        <InputGroup>
          <FormControl
            name="baseMaterial"
            value={baseMaterial}
            componentClass="select"
            onChange={handleInputChange}
            required
          >
            {baseMaterials.map(material => (
              <option key={material.uri} value={material.uri}>
                {material.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            {baseMaterial && (
              <div
                style={{
                  margin: '0 auto',
                  width: 20,
                  height: 20,
                  backgroundColor: baseMaterialColor,
                }}
              />
            )}
          </InputGroup.Addon>
          <InputGroup.Addon>
            {baseMaterialColor && (
              <ResourceLink
                href={`/#/records/material/${extractUuid(baseMaterial)}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>

      <FormRow id="field.supportMaterial" defaultMessage="Support Material">
        <InputGroup>
          <FormControl
            name="supportMaterial"
            value={supportMaterial}
            componentClass="select"
            onChange={handleInputChange}
          >
            <option value="">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {supportMaterials.map(material => (
              <option key={material.uri} value={material.uri}>
                {material.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            <div
              style={{
                margin: '0 auto',
                width: 20,
                height: 20,
                backgroundColor: supportMaterialColor || null,
              }}
            />
          </InputGroup.Addon>
          <InputGroup.Addon style={{ minWidth: '62px' }}>
            {supportMaterial && (
              <ResourceLink
                href={`/#/records/material/${extractUuid(supportMaterial)}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>

      <FormRow id="field.template" defaultMessage="Select a template">
        <InputGroup>
          <FormControl
            name="template"
            value={template}
            componentClass="select"
            onChange={handleInputChange}
          >
            {templates.map(t => (
              <option key={t.uri} value={t.uri}>
                {t.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            {template && (
              <ResourceLink
                href={`/#/records/template/${extractUuid(template)}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>

      <FormRow
        id="field.thirdPartyProvider"
        defaultMessage="Third-Party Provider"
      >
        <InputGroup>
          <FormControl
            name="thirdPartyProvider"
            value={thirdPartyProvider}
            componentClass="select"
            onChange={handleInputChange}
          >
            <option value="">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {providers.map(provider => (
              <option key={provider.uri} value={provider.uri}>
                {provider.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon style={{ minWidth: '62px' }}>
            {thirdPartyProvider && (
              <ResourceLink
                href={`/#/records/third-party-providers/${extractUuid(
                  thirdPartyProvider
                )}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>
      <FormRow id="field.notes" defaultMessage="Notes">
        <FormControl
          name="notes"
          value={notes}
          componentClass="textarea"
          onChange={handleInputChange}
        />
      </FormRow>
    </Form>
  );
};

LineItemEditForm.defaultProps = {
  modelUnits: 'auto',
  modelUpload: null,
  notes: null,
  supportMaterial: null,
  supportMaterialColor: null,
  template: null,
  thirdPartyProvider: null,
};

LineItemEditForm.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleFileRemove: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleLayerThicknessBlur: PropTypes.func.isRequired,
  handleModelDownload: PropTypes.func.isRequired,
  isRestricted: PropTypes.bool.isRequired,
  layerThickness: PropTypes.number.isRequired,
  lineItem: PropTypes.shape({}).isRequired,
  baseMaterial: PropTypes.string.isRequired,
  baseMaterialColor: PropTypes.string.isRequired,
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelUnits: PropTypes.string,
  modelUpload: PropTypes.shape({ name: PropTypes.string }),
  notes: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantity: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  supportMaterial: PropTypes.string,
  supportMaterialColor: PropTypes.string,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  template: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  thirdPartyProvider: PropTypes.string,
};

export default LineItemEditForm;
