import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import {
  FormattedDuration,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

const RunActuals = ({ base, end, postProcessing, print, start, support }) => (
  <Panel bsStyle="success">
    <ListGroup fill>
      <ListGroupItem
        header={
          <FormattedMessage
            id="field.actualStartTime"
            defaultMessage="Actual Start Time"
          />
        }
      >
        {start ? (
          <span>
            {Moment(start).format('MMMM DD YYYY, h:mm:ss a')}
            ({Moment(start).fromNow()})
          </span>
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>

      <ListGroupItem
        header={
          <FormattedMessage
            id="field.actualEndTime"
            defaultMessage="Actual End Time"
          />
        }
      >
        {end ? (
          <span>
            {Moment(end).format('MMMM DD YYYY, h:mm:ss a')}{' '}
            {Moment(end).fromNow()}
          </span>
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>

      <ListGroupItem
        header={
          <FormattedMessage
            id="field.actualPrintTime"
            defaultMessage="Actual Print Time"
          />
        }
      >
        {print ? (
          <FormattedDuration value={print} />
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>

      <ListGroupItem
        header={
          <FormattedMessage
            id="field.actualPostProcessingTime"
            defaultMessage="Actual Post Processing Time"
          />
        }
      >
        {postProcessing ? (
          <FormattedDuration value={postProcessing} />
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>

      <ListGroupItem
        header={
          <FormattedMessage
            id="field.actualMaterialUsed"
            defaultMessage="Actual Material Used"
          />
        }
      >
        {base ? (
          <FormattedVolume value={base} />
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>
      <ListGroupItem
        header={
          <FormattedMessage
            id="field.actualSupportUsed"
            defaultMessage="Actual Support Used"
          />
        }
      >
        {support ? (
          <FormattedVolume value={support} />
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>
    </ListGroup>
  </Panel>
);

RunActuals.defaultProps = {
  base: null,
  end: null,
  postProcessing: null,
  print: null,
  start: null,
  support: null,
};

RunActuals.propTypes = {
  base: PropTypes.number,
  end: PropTypes.string,
  postProcessing: PropTypes.number,
  print: PropTypes.number,
  start: PropTypes.string,
  support: PropTypes.number,
};

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  if (!run) return {};
  const {
    actuals: {
      start,
      end,
      time: { print, post_processing: postProcessing },
      materials: { base, support },
    },
  } = run;
  return {
    base,
    end,
    postProcessing,
    print,
    start,
    support,
  };
};

export default connect(mapStateToProps)(RunActuals);
