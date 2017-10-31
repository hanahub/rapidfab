import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  ListGroup,
  ListGroupItem,
  MenuItem,
  Panel,
  Row,
  SplitButton,
} from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const styles = {
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const PostProcessorForm = ({
  fields,
  handleSubmit,
  locations,
  onDelete,
  postProcessorTypes,
}) => {
  const postProcessorType = postProcessorTypes.find(
    ppt => ppt.uri === fields.post_processor_type.value
  );
  return (
    <form onSubmit={handleSubmit}>
      <Grid fluid>
        <BreadcrumbNav
          breadcrumbs={['postProcessors', fields.id.value || 'New']}
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
          <Col xs={12} sm={6}>
            <FormGroup controlId="uxName">
              <ControlLabel>Name:</ControlLabel>
              <FormControl name="name" type="text" required {...fields.name} />
            </FormGroup>
            <FormGroup controlId="uxLocation">
              <ControlLabel>
                <FormattedMessage
                  id="field.location"
                  defaultMessage="Location"
                />:
              </ControlLabel>
              <FormControl
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
              </FormControl>
            </FormGroup>
            <FormGroup controlId="uxPostProcessorType">
              <ControlLabel>
                <FormattedMessage
                  id="field.postProcessorType"
                  defaultMessage="Post Processor Type"
                />:
              </ControlLabel>
              <FormControl
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
              </FormControl>
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
          </Col>
          <Col xs={12} sm={6}>
            {postProcessorType && (
              <Panel header={`Post Processor Type: ${postProcessorType.name}`}>
                <ListGroup fill>
                  <ListGroupItem style={styles.flexRow}>
                    <strong>Description</strong>
                    <span>{postProcessorType.description}</span>
                  </ListGroupItem>
                  <ListGroupItem style={styles.flexRow}>
                    <strong>Duration</strong>
                    <span>
                      {postProcessorType.duration ? (
                        postProcessorType.duration
                      ) : (
                        'N/A'
                      )}
                    </span>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            )}
          </Col>
        </Row>
      </Grid>
    </form>
  );
};

PostProcessorForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessorForm;
