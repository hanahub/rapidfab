import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import { FormattedMessage, FormattedVolume } from 'rapidfab/i18n';

import TimeDisplay from 'rapidfab/components/TimeDisplay';

const RunEstimates = ({ base, end, postProcessing, print, start, support }) => (
  <Panel bsStyle="info">
    <ListGroup fill>
      <ListGroupItem
        header={
          <FormattedMessage
            id="field.estimatedStartTime"
            defaultMessage="Estimated Start Time"
          />
        }
      >
        {start ? (
          <span>
            {Moment(start).format('MMMM DD YYYY, h:mm:ss a')}{' '}
            {Moment(start).fromNow()}
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
            id="field.estimatedEndTime"
            defaultMessage="Estimated End Time"
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
            id="field.estimatedPrintTime"
            defaultMessage="Estimated Print Time"
          />
        }
      >
        {print ? (
          <TimeDisplay seconds={print} />
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>

      <ListGroupItem
        header={
          <FormattedMessage
            id="field.estimatedPostProcessingTime"
            defaultMessage="Estimated Post Processing Time"
          />
        }
      >
        {postProcessing ? (
          <TimeDisplay seconds={postProcessing} />
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </ListGroupItem>

      <ListGroupItem
        header={
          <FormattedMessage
            id="field.estimatedMaterialUsed"
            defaultMessage="Estimated Material Used"
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
            id="field.estimatedSupportUsed"
            defaultMessage="Estimated Support Used"
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

RunEstimates.defaultProps = {
  base: null,
  end: null,
  postProcessing: null,
  print: null,
  start: null,
  support: null,
};

RunEstimates.propTypes = {
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
    estimates: {
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

export default connect(mapStateToProps)(RunEstimates);
