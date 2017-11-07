import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import {
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  MenuItem,
  SplitButton,
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const Printer = ({
  handleSubmit,
  handleInputChange,
  handleDelete,
  loading,
  location,
  locations,
  modeler,
  name,
  printerType,
  printerTypes,
  uuid,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers', uuid || 'New']} />
    <FlashMessages />
    {loading ? (
      <Loading />
    ) : (
      <form onSubmit={handleSubmit}>
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
              <MenuItem eventKey={1} onClick={handleDelete} disabled={!uuid}>
                <Fa name="ban" />{' '}
                <FormattedMessage id="button.delete" defaultMessage="Delete" />
              </MenuItem>
            </SplitButton>
          </ButtonToolbar>
        </div>

        <hr />

        <FormGroup controlId="uxName">
          <ControlLabel>
            <FormattedMessage id="field.name" defaultMessage="Name" />
          </ControlLabel>
          <FormControl
            name="name"
            onChange={handleInputChange}
            required
            type="text"
            value={name}
          />
        </FormGroup>

        <FormGroup controlId="uxPrinterType">
          <ControlLabel>
            <FormattedMessage
              id="field.printerType"
              defaultMessage="Printer Type"
            />
          </ControlLabel>
          <FormControl
            name="printerType"
            onChange={handleInputChange}
            componentClass="select"
            required
            value={printerType}
          >
            {printerTypes.map(type => (
              <option
                key={type.uri}
                value={type.uri}
              >{`${type.name} - ${type.id}`}</option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="uxLocation">
          <ControlLabel>
            <FormattedMessage id="field.location" defaultMessage="Location" />
          </ControlLabel>
          <FormControl
            name="location"
            componentClass="select"
            onChange={handleInputChange}
            required
            value={location}
          >
            {locations.map(loc => (
              <option
                key={loc.uri}
                value={loc.uri}
              >{`${loc.name} - ${loc.id}`}</option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="uxModeler">
          <ControlLabel>
            <FormattedMessage id="field.modeler" defaultMessage="Modeler" />
          </ControlLabel>
          <FormControl
            name="modeler"
            onChange={handleInputChange}
            type="text"
            value={modeler}
          />
        </FormGroup>
      </form>
    )}
  </Grid>
);

Printer.defaultProps = {
  location: null,
  printerType: null,
  uuid: null,
};

Printer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.string,
  locations: PropTypes.array.isRequired,
  modeler: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  printerType: PropTypes.string,
  printerTypes: PropTypes.array.isRequired,
  uuid: PropTypes.string,
};

export default Printer;
