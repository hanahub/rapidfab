import React from 'react';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

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
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const Printer = ({
  handleSubmit,
  handleInputChange,
  handleDelete,
  printerType,
  printerTypes,
  location,
  locations,
  modeler,
  name,
  uuid,
}) => (
    <Grid fluid>
      <BreadcrumbNav breadcrumbs={['printers', uuid || 'New']} />
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
              onClick={handleDelete}
              disabled={!uuid}
            >
              <Fa name="ban" />{' '}
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </MenuItem>
          </SplitButton>
        </ButtonToolbar>
      </div>

      <hr />

      <FlashMessages />

      <form onSubmit={handleSubmit}>

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
            {printerTypes.map(printerType => (
              <option
                key={printerType.uri}
                value={printerType.uri}
              >{`${printerType.name} - ${printerType.id}`}</option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="uxLocation">
          <ControlLabel>
            <FormattedMessage
              id="field.location"
              defaultMessage="Location"
            />
          </ControlLabel>
          <FormControl
            name="location"
            componentClass="select"
            onChange={handleInputChange}
            required
            value={location}
          >
            {locations.map(location => (
              <option
                key={location.uri}
                value={location.uri}
              >{`${location.name} - ${location.id}`}</option>
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
            required
            type="text"
            value={modeler}
          />
        </FormGroup>

      </form>
    </Grid>
);

export default Printer;
