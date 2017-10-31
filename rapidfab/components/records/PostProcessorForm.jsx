import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const PostProcessorForm = ({
  fields,
  handleSubmit,
  locations,
  onDelete,
  postProcessorTypes,
}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav
        breadcrumbs={['postProcessors', fields.id.value || 'New']}
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

      <FlashMessages />

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel>Name:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxLocation">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.location"
                defaultMessage="Location"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              placeholder="location"
              required
              {...fields.location}
            >
              <option key="placeholder" value="" disabled>
                Select a Location
              </option>
              {locations.map(location => (
                <option key={location.uri} value={location.uri}>
                  {location.name}
                </option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxPostProcessorType">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.postProcessorType"
                defaultMessage="Post Processor Type"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              placeholder="post_processor_type"
              required
              {...fields.post_processor_type}
            >
              <option key="placeholder" value="" disabled>
                Select a Post Processor Type
              </option>
              {postProcessorTypes.map(postProcessorType => (
                <option
                  key={postProcessorType.uri}
                  value={postProcessorType.uri}
                >
                  {postProcessorType.name}
                </option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxDuration">
            <BS.ControlLabel>Duration (seconds):</BS.ControlLabel>
            <BS.FormControl
              name="duration"
              type="number"
              required
              {...fields.duration}
            />
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

PostProcessorForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessorForm;
