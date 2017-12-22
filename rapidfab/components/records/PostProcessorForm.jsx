import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  MenuItem,
  Panel,
  Row,
  SplitButton,
} from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Loading from 'rapidfab/components/Loading';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const styles = {
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  spacingTop: { marginTop: '1rem' },
};

const PostProcessorForm = ({
  duration,
  handleDelete,
  handleInputChange,
  handleSubmit,
  loading,
  location,
  locations,
  name,
  postProcessorType,
  postProcessorTypes,
  selectedPostProcessorType,
  submitting,
  uuid,
}) => (
  <div style={styles.spacingTop}>
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
              title={submitting ? <Loading /> : <SaveButtonTitle />}
              pullRight
            >
              <MenuItem eventKey={1} onClick={handleDelete} disabled={!uuid}>
                <Fa name="ban" />{' '}
                <FormattedMessage id="button.delete" defaultMessage="Delete" />
              </MenuItem>
            </SplitButton>
          </ButtonToolbar>
        </div>

        <br />

        <Row>
          <Col xs={12} sm={6}>
            <FormGroup controlId="uxName">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                name="name"
                type="text"
                required
                onChange={handleInputChange}
                value={name}
              />
            </FormGroup>
            <FormGroup controlId="uxLocation">
              <ControlLabel>
                <FormattedMessage
                  id="field.location"
                  defaultMessage="Location"
                />
              </ControlLabel>
              <FormControl
                componentClass="select"
                name="location"
                onChange={handleInputChange}
                required
                value={location}
              >
                {locations.map(loc => (
                  <option key={loc.uri} value={loc.uri}>
                    {loc.name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="uxPostProcessorType">
              <ControlLabel>
                <FormattedMessage
                  id="field.postProcessorType"
                  defaultMessage="Post Processor Type"
                />
              </ControlLabel>
              <FormControl
                componentClass="select"
                name="postProcessorType"
                onChange={handleInputChange}
                required
                value={postProcessorType}
              >
                {postProcessorTypes.map(ppt => (
                  <option key={ppt.uri} value={ppt.uri}>
                    {ppt.name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="uxDuration">
              <ControlLabel>Duration (seconds)</ControlLabel>
              <FormControl
                name="duration"
                onChange={handleInputChange}
                required
                type="number"
                value={duration}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={6}>
            {selectedPostProcessorType && (
              <Panel
                header={`Post Processor Type: ${
                  selectedPostProcessorType.name
                }`}
              >
                <ListGroup fill>
                  <ListGroupItem style={styles.flexRow}>
                    <strong>
                      <FormattedMessage
                        id="field.description"
                        defaultMessages="Description"
                      />
                    </strong>
                    <span>{selectedPostProcessorType.description}</span>
                  </ListGroupItem>
                  <ListGroupItem style={styles.flexRow}>
                    <strong>
                      <FormattedMessage
                        id="field.duration"
                        defaultMessage="Duration"
                      />
                    </strong>
                    <span>
                      {selectedPostProcessorType.duration ? (
                        selectedPostProcessorType.duration
                      ) : (
                        <FormattedMessage
                          id="notAvailable"
                          defaultMessage="N/A"
                        />
                      )}
                    </span>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            )}
          </Col>
        </Row>
      </form>
    )}
  </div>
);

PostProcessorForm.defaultProps = {
  selectedPostProcessorType: null,
  uuid: null,
};

PostProcessorForm.propTypes = {
  duration: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  postProcessorType: PropTypes.string.isRequired,
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPostProcessorType: PropTypes.shape({
    description: PropTypes.string,
    duration: PropTypes.number,
    name: PropTypes.string,
  }),
  submitting: PropTypes.bool.isRequired,
  uuid: PropTypes.string,
};

export default PostProcessorForm;
