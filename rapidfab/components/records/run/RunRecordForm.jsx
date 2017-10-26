import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import {
  ButtonToolbar,
  Col,
  FormControl,
  Label,
  MenuItem,
  Row,
  SplitButton,
} from 'react-bootstrap';

import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import { RUN_STATUS_MAP } from 'rapidfab/mappings';

import ResourceLink from 'rapidfab/components/ResourceLink';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

import RunModelDownload from './RunModelDownload';

const InfoRow = ({ children, id, message }) => (
  <Row>
    <Col xs={3}>
      <Label>
        <FormattedMessage id={id} defaultMessage={message} />:
      </Label>
    </Col>
    <Col xs={9}>{children}</Col>
  </Row>
);

const RunRecordForm = ({
  created,
  handleDelete,
  handleInputChange,
  handleSubmit,
  initialStatus,
  isFetching,
  isSaving,
  notes,
  model,
  postProcessor,
  printerType,
  printer,
  status,
  uuid,
}) => (
  <div>
    <div className="clearfix">
      <ButtonToolbar className="pull-right">
        <SplitButton
          id="uxSaveDropdown"
          bsStyle="success"
          bsSize="small"
          disabled={isFetching || isSaving}
          title={isSaving ? <Fa spin name="spinner" /> : <SaveButtonTitle />}
          pullRight
          onClick={handleSubmit}
        >
          <MenuItem disabled={isFetching} eventKey={1} onClick={handleDelete}>
            <Fa name="ban" />{' '}
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </MenuItem>
        </SplitButton>
      </ButtonToolbar>
    </div>

    <InfoRow id="field.created" defaultMessage="Created">
      {created ? <FormattedDateTime value={created} /> : <span>-</span>}
    </InfoRow>

    <InfoRow id="field.status" defaultMessage="Status">
      {status ? (
        <FormControl
          componentClass="select"
          id="status"
          name="status"
          onChange={handleInputChange}
          type="select"
          value={status}
        >
          <option key={initialStatus} value={initialStatus}>
            {RUN_STATUS_MAP[initialStatus]}
          </option>
          {['in-progress', 'complete', 'error']
            .filter(statusOption => initialStatus !== statusOption)
            .map(statusOption => (
              <option key={statusOption} value={statusOption}>
                {RUN_STATUS_MAP[statusOption]}
              </option>
            ))}
        </FormControl>
      ) : (
        <span>-</span>
      )}
    </InfoRow>

    <InfoRow id="field.model" defaultMessage="Model">
      {model ? <RunModelDownload model={model} run={uuid} /> : <span>-</span>}
    </InfoRow>

    <InfoRow id="field.printer" defaultMessage="Printer">
      {printer ? (
        <ResourceLink uri={printer} endpoint="printer" />
      ) : (
        <span>-</span>
      )}
    </InfoRow>

    <InfoRow id="field.printerType" defaultMessage="Printer Type">
      {printerType ? (
        <ResourceLink uri={printerType} endpoint="printer-type" />
      ) : (
        <span>-</span>
      )}
    </InfoRow>

    <InfoRow id="field.postProcessor" defaultMessage="Post-Processor">
      {postProcessor ? (
        <ResourceLink uri={postProcessor} endpoint="post-processor" />
      ) : (
        <span>-</span>
      )}
    </InfoRow>

    <InfoRow id="field.notes" defaultMessage="Notes">
      <FormControl
        componentClass="textarea"
        disabled={isFetching}
        name="notes"
        value={notes || ''}
        onChange={handleInputChange}
      />
    </InfoRow>
  </div>
);

RunRecordForm.propTypes = {
  created: null,
  notes: null,
  initialStatus: null,
  model: null,
  postProcessor: null,
  printerType: null,
  printer: null,
  status: null,
  uuid: null,
};

RunRecordForm.propTypes = {
  created: PropTypes.string,
  notes: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialStatus: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  model: PropTypes.string,
  postProcessor: PropTypes.string,
  printerType: PropTypes.string,
  printer: PropTypes.string,
  status: PropTypes.string,
  uuid: PropTypes.string,
};

export default RunRecordForm;
