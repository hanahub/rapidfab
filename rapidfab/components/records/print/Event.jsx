import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PathToRegexp from 'path-to-regexp';
import FontAwesome from 'react-fontawesome';
import { Button, Col, ListGroupItem, Row } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import {
  EVENT_KEY_MAPPING,
  ORDER_STATUS_MAP,
  ORDER_REGION_MAPPING,
  ORDER_SALES_MAPPING,
  ORDER_TYPE_MAPPING,
  RUN_STATUS_MAP,
} from 'rapidfab/mappings';
import { FormattedDate, FormattedTime } from 'rapidfab/i18n';

const VALUE_MAPPING = Object.assign(
  {},
  ORDER_STATUS_MAP,
  RUN_STATUS_MAP,
  ORDER_REGION_MAPPING,
  ORDER_SALES_MAPPING,
  ORDER_TYPE_MAPPING
);

const REFERENCE_MAPPING = {
  'line-item': 'Line Item',
  order: 'Order',
};

const extractResourceType = uri => {
  const pattern = PathToRegexp(':protocol//:domain/:resource/:uuid/');
  const match = pattern.exec(uri);
  if (!match || !match.length || match.length !== 5) {
    throw new Error(`Could not extract resource from uri: ${uri}`);
  }
  return match[3];
};

const isResourceValue = value => {
  /* eslint-disable no-useless-escape */
  const uriPattern = /^(?:[^\/]+?)\/\/(?:[^\/]+?)\/(?:[^\/]+?)\/(?:[^\/]+?)(?:\/(?=$))?$/;
  return uriPattern.test(value);
  /* eslint-enable no-useless-escape */
};

const EventName = ({ name }) => {
  if (EVENT_KEY_MAPPING[name]) {
    return EVENT_KEY_MAPPING[name];
  }
  return <span>{name}</span>;
};

EventName.propTypes = {
  name: PropTypes.string.isRequired,
};

const EventUser = connect((state, ownProps) => {
  const user = Selectors.getUsers(state).find(
    stateUser => stateUser.uri === ownProps.userURI
  );
  return { user };
})(({ user }) => {
  const href = user ? `#/records/user/${user.uuid}` : '';
  return <a href={href}> {user.name} </a>;
});

const ResourceValue = connect((state, ownProps) => {
  const resource = state.resources[extractUuid(ownProps.uri)];
  return { resource };
})(({ dispatch, resource, uri }) => {
  if (resource && resource.name) {
    const { name, snapshot_content: snapshotContent } = resource;
    if (snapshotContent) {
      const handleDownload = () => {
        dispatch(Actions.DownloadModel.fetchModel(uri)).then(response => {
          dispatch(
            Actions.DownloadModel.downloadContent(name, response.json.content)
          );
        });
      };
      return (
        <span>
          <a onClick={handleDownload} role="button" tabIndex={0}>
            {name}
          </a>
          {` `}
          <a href={snapshotContent} target="_blank">
            <FontAwesome name="picture-o" />
          </a>
        </span>
      );
    }
    const resourceType = extractResourceType(resource.uri);
    const href = `#/records/${resourceType}/${resource.uuid}`;
    return <a href={href}>{name}</a>;
  }
  return <span>{uri}</span>;
});

const EventValue = ({ value }) => {
  if (!value) {
    return <span>None</span>;
  } else if (isResourceValue(value)) {
    return <ResourceValue uri={value} />;
  }
  return <span> {VALUE_MAPPING[value] ? VALUE_MAPPING[value] : value} </span>;
};

EventValue.propTypes = {
  value: PropTypes.string.isRequired,
};

const EventReference = ({ reference }) => {
  const resourceType = extractResourceType(reference);
  return <span> {REFERENCE_MAPPING[resourceType]} </span>;
};

EventReference.propTypes = {
  reference: PropTypes.string.isRequired,
};

const ExpandedContent = ({ event }) => (
  <Row>
    <Col xs={1} />
    <Col xs={8}>
      <span>to </span>
      <EventValue value={event.current_value} />
      <span> from </span>
      <EventValue value={event.previous_value} />
    </Col>
    <Col xs={3} className="text-right">
      <FormattedTime value={event.created} />
      <br />
      {event.user ? <EventUser userURI={event.user} /> : null}
    </Col>
  </Row>
);

ExpandedContent.propTypes = {
  event: PropTypes.shape({}).isRequired,
};

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { toggleCollapsed } = this;
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={1}>
            <Button bsSize="xsmall" onClick={toggleCollapsed}>
              <FontAwesome
                name={collapsed ? 'chevron-right' : 'chevron-down'}
              />
            </Button>
          </Col>
          <Col xs={8}>
            <EventReference reference={event.reference} />{' '}
            <EventName name={event.key} />
            <span> change</span>
          </Col>
          <Col xs={3} className="text-right">
            <FormattedDate value={event.created} />
          </Col>
        </Row>
        {collapsed ? null : <ExpandedContent {...this.props} />}
      </ListGroupItem>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape({}).isRequired,
};

export default Event;
