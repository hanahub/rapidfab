import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import Grid, { IdColumn, DateColumn } from 'rapidfab/components/grid';
import { RUN_STATUS_MAP } from 'rapidfab/mappings';

import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import { FormControlSelect } from 'rapidfab/components/formTools';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import FormRow from 'rapidfab/components/FormRow';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

import RunEstimates from './RunEstimates';
import RunActuals from './RunActuals';

const styles = { spacingBelow: { marginBottom: '2rem' } };

const StatusField = ({ statuses, fields }) => {
  const restrictedStatuses = ['calculated', 'calculating', 'queued'];
  _.pull(restrictedStatuses, fields.status.value);
  _.pullAll(statuses, restrictedStatuses);
  return (
    <FormRow id="field.status" defaultMessage="Status">
      <FormControlSelect {...fields.status}>
        <option value="" disabled>
          Select a Status
        </option>
        {statuses.map(status => (
          <option key={status} value={status}>
            {RUN_STATUS_MAP[status]}
          </option>
        ))}
      </FormControlSelect>
    </FormRow>
  );
};

StatusField.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  fields: PropTypes.object.isRequired,
};

const ModelDownloadField = ({ runUUID, model, onClick, isDownloading }) => {
  if (!model) {
    return <BS.FormControl.Static> - </BS.FormControl.Static>;
  }
  if (isDownloading) {
    return (
      <BS.FormControl.Static>
        <FormattedMessage id="downloading" defaultMessage="Downloading..." />
      </BS.FormControl.Static>
    );
  }
  return (
    <BS.FormControl.Static>
      <a
        href={window.location.hash}
        onClick={() => onClick(runUUID, model.value)}
      >
        {model.value}
      </a>
    </BS.FormControl.Static>
  );
};

ModelDownloadField.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  runUUID: PropTypes.string.isRequired,
};

const LinkField = ({ uri, resources, endpoint }) => {
  if (!uri) {
    return <BS.FormControl.Static> - </BS.FormControl.Static>;
  }

  const record = _.find(resources, { uri });

  if (record && record.name) {
    const uuid = uri.substr(uri.length - 37, 36);
    const fullLocation = `${location.origin}/#/records/${endpoint}/${uuid}`;
    return (
      <BS.FormControl.Static>
        <a href={fullLocation}>{record.name}</a>
      </BS.FormControl.Static>
    );
  }
  return <Fa name="spinner" spin />;
};

LinkField.propTypes = {
  endpoint: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  uri: PropTypes.string.isRequired,
};

const RunEdit = ({
  downloadModel,
  fields,
  gridData,
  handleSubmit,
  onDelete,
  onModelDownload,
  onRequeue,
  orders,
  postProcessors,
  printers,
  printerTypes,
  statuses,
}) => (
  <BS.Form horizontal onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['runs', fields.id.value]} />
      <FlashMessages />

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
              onClick={() => onDelete(_.get(fields, 'uuid.value'))}
            >
              <Fa name="ban" />{' '}
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </BS.MenuItem>
          </BS.SplitButton>
        </BS.ButtonToolbar>
      </div>

      <hr />

      <BS.Row>
        <BS.Col xs={12} sm={4}>
          <BS.ButtonGroup style={styles.spacingBelow} vertical block>
            <BS.Button onClick={() => onRequeue(fields.uri.value)}>
              <FormattedMessage
                id="scheduleAsNextPrint"
                defaultMessage="Schedule As Next Print"
              />
            </BS.Button>
          </BS.ButtonGroup>

          <RunEstimates />
          <RunActuals />
        </BS.Col>

        <BS.Col xs={12} sm={8}>
          <FormRow id="field.id" defaultMessage="ID">
            <BS.FormControl.Static>{fields.id.value}</BS.FormControl.Static>
          </FormRow>

          <StatusField statuses={statuses} fields={fields} />

          <FormRow
            controlId="uxCreated"
            id="field.created"
            defaultMessage="Created"
          >
            <BS.FormControl.Static>
              {_.get(fields, 'created.value') ? (
                <FormattedDateTime value={fields.created.value} />
              ) : (
                <em>
                  <FormattedMessage id="notAvailable" defaultMessage="N/A" />
                </em>
              )}
            </BS.FormControl.Static>
          </FormRow>

          <FormRow id="field.model" defaultMessage="Model">
            {_.get(fields, 'model.value') ? (
              <ModelDownloadField
                runUUID={fields.uuid.value}
                model={fields.model}
                onClick={onModelDownload}
                isDownloading={downloadModel.downloadingModel}
              />
            ) : (
              <em>
                <FormattedMessage id="notAvailable" defaultMessage="N/A" />
              </em>
            )}
          </FormRow>

          <FormRow id="field.printer" defaultMessage="Printer">
            <LinkField
              uri={_.get(fields, 'printer.value')}
              endpoint="printer"
              resources={printers}
            />
          </FormRow>

          <FormRow id="field.printerType" defaultMessage="Printer Type">
            <LinkField
              uri={_.get(fields, 'printer_type.value')}
              endpoint="printer-type"
              resources={printerTypes}
            />
          </FormRow>

          <FormRow id="field.postProcessor" defaultMessage="Post-Processor">
            <LinkField
              uri={_.get(fields, 'post_processor.value')}
              endpoint="post-processor"
              resources={postProcessors}
            />
          </FormRow>

          <FormRow id="field.notes" defaultMessage="Notes">
            <BS.FormControl
              componentClass="textarea"
              name="notes"
              {...fields.notes}
            />
          </FormRow>

          <BS.Panel
            header={
              <FormattedMessage id="field.prints" defaultMessage="Prints" />
            }
          >
            <Grid
              data={gridData}
              columns={['id', 'order', 'dueDate', 'customerName']}
              columnMeta={[
                {
                  displayName: (
                    <FormattedMessage id="field.id" defaultMessage="ID" />
                  ),
                  columnName: 'id',
                  customComponent: IdColumn('print'),
                  locked: true,
                },
                {
                  displayName: (
                    <FormattedMessage id="field.order" defaultMessage="Order" />
                  ),
                  columnName: 'order',
                  customComponent: IdColumn('order', 'order', orders, 'name'),
                },
                {
                  displayName: (
                    <FormattedMessage
                      id="field.due_date"
                      defaultMessage="Due Date"
                    />
                  ),
                  columnName: 'dueDate',
                  customComponent: DateColumn,
                },
                {
                  displayName: (
                    <FormattedMessage
                      id="field.customer_name"
                      defaultMessage="Customer Name"
                    />
                  ),
                  columnName: 'customerName',
                },
              ]}
            />
          </BS.Panel>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </BS.Form>
);

RunEdit.propTypes = {
  downloadModel: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  gridData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModelDownload: PropTypes.func.isRequired,
  onRequeue: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessors: PropTypes.arrayOf(PropTypes.object).isRequired,
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RunEdit;
