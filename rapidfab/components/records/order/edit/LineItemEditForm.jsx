import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Form, FormControl, InputGroup, Label } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';
import FormRow from 'rapidfab/components/FormRow';
import SaveDropdownButton from './SaveDropdownButton';

const ResourceLink = ({ href }) => (
  <a href={href}>
    Go <Fa name="external-link" />
  </a>
);

const statusOptionsMap = {
  pending: ['cancelled', 'confirmed'],
  confirmed: ['cancelled'],
  printing: ['cancelled'],
  printed: ['cancelled', 'shipping', 'complete'],
  shipping: ['cancelled', 'complete'],
};

const Printable = ({ models, uri, itar }) => {
  const model = models.find(model => model.uri === uri);
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
  handleInputChange,
  lineItem,
  notes,
  baseMaterial,
  baseMaterials,
  models,
  onSubmit,
  onDelete,
  providers,
  quantity,
  status,
  supportMaterial,
  supportMaterials,
  template,
  templates,
  thirdPartyProvider,
}) => {
  const currentModel = models.find(model => model.uri === lineItem.model);
  const statusOptions = statusOptionsMap[lineItem.status];
  return (
    <Form horizontal>
      <SaveDropdownButton onSubmit={onSubmit} onDelete={onDelete} />
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
        <FormControl
          name="status"
          componentClass="select"
          onChange={handleInputChange}
          value={status}
          required
        >
          <option value={status}>{ORDER_STATUS_MAP[status]}</option>
          {statusOptions ? (
            statusOptions.map(status => (
              <option key={status} value={status}>
                {ORDER_STATUS_MAP[status]}
              </option>
            ))
          ) : null}
        </FormControl>
      </FormRow>

      {lineItem.itar ? null : (
        <div>
          <FormRow id="field.model" defaultMessage="Model">
            <p>
              <a href={currentModel ? currentModel.content : null}>
                {currentModel ? currentModel.name : 'Loading Model...'}
              </a>
            </p>
          </FormRow>
          <FormRow id="field.replaceModel" defaultMessage="Replace Model">
            <FormControl
              name="model"
              type="file"
              accept=".stl"
              required
              onChange={handleFileChange}
            />
          </FormRow>
        </div>
      )}

      <FormRow id="field.quantity" defaultMessage="Quantity">
        <FormControl
          name="quantity"
          value={quantity}
          type="number"
          onChange={handleInputChange}
          required
        />
      </FormRow>

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
              <ResourceLink
                href={`/#/records/materials/${extractUuid(baseMaterial)}`}
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
            {supportMaterial && (
              <ResourceLink
                href={`/#/records/materials/${extractUuid(supportMaterial)}`}
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
            {templates.map(template => (
              <option key={template.uri} value={template.uri}>
                {template.name}
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
          <InputGroup.Addon>
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
  supportMaterial: null,
  template: null,
  thirdPartyProvider: null,
};

LineItemEditForm.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  lineItem: PropTypes.object.isRequired,
  baseMaterial: PropTypes.string.isRequired,
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantity: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  supportMaterial: PropTypes.string,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  template: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  thirdPartyProvider: PropTypes.string,
};

export default LineItemEditForm;
