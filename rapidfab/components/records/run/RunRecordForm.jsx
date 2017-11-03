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

const styles = {
  spacingBottom: { marginBottom: '15px' },
};

const InfoRow = ({ children, id, message }) => (
  <Row style={styles.spacingBottom}>
    <Col xs={3}>
      <strong>
        <FormattedMessage id={id} defaultMessage={message} />:
      </strong>
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

    {created ? (
      <InfoRow id="field.created" defaultMessage="Created">
        <FormattedDateTime value={created} />
      </InfoRow>
    ) : null}

    {status ? (
      <InfoRow id="field.status" defaultMessage="Status">
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
      </InfoRow>
    ) : null}

    {model ? (
      <InfoRow id="field.model" defaultMessage="Model">
        <RunModelDownload model={model} run={uuid} />
      </InfoRow>
    ) : null}

    {printer ? (
      <InfoRow id="field.printer" defaultMessage="Printer">
        <ResourceLink uri={printer} endpoint="printer" />
      </InfoRow>
    ) : null}

    {printerType ? (
      <InfoRow id="field.printerType" defaultMessage="Printer Type">
        <ResourceLink uri={printerType} endpoint="printer-type" />
      </InfoRow>
    ) : null}

    {postProcessor ? (
      <InfoRow id="field.postProcessor" defaultMessage="Post-Processor">
        <ResourceLink uri={postProcessor} endpoint="post-processor" />
      </InfoRow>
    ) : null}

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
