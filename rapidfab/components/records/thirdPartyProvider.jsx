import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';
import Loading from 'rapidfab/components/Loading';

const ThirdPartyProviderForm = ({ fields }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>Name:</BS.ControlLabel>
        <BS.FormControl name="name" type="text" required {...fields.name} />
      </BS.FormGroup>
      <BS.FormGroup controlId="uxDescription">
        <BS.ControlLabel>Description:</BS.ControlLabel>
        <BS.FormControl
          name="address"
          type="text"
          componentClass="textarea"
          {...fields.description}
        />
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
);

ThirdPartyProviderForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
};

const ThirdPartyProvider = ({
  fields,
  handleSubmit,
  submitting,
  onDelete,
  apiErrors,
}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav
        breadcrumbs={['thirdPartyProviders', fields.id.value || 'New']}
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

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors} />
        </BS.Col>
      </BS.Row>

      {submitting ? <Loading /> : <ThirdPartyProviderForm fields={fields} />}
    </BS.Grid>
  </form>
);

ThirdPartyProvider.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThirdPartyProvider;
