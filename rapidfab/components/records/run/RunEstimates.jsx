import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Label, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import {
  FormattedDuration,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

const RunEstimates = ({ base, end, postProcessing, print, start, support }) => (
  <Panel bsStyle="info">
    <ListGroup fill>
      <ListGroupItem header="Estimates" />

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.estimatedStartTime"
            defaultMessage="Estimated Start Time"
          />
        </Label>
        <br />
        {start ? (
          <span>
            {Moment(start).format('MMMM DD YYYY, h:mm:ss a')} <br />
            {Moment(start).fromNow()}
          </span>
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.estimatedEndTime"
            defaultMessage="Estimated End Time"
          />
        </Label>
        <br />
        {end ? (
          <span>
            {Moment(end).format('MMMM DD YYYY, h:mm:ss a')} <br />
            {Moment(end).fromNow()}
          </span>
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.estimatedPrintTime"
            defaultMessage="Estimated Print Time"
          />
        </Label>
        <br />
        {print ? (
          <FormattedDuration value={print} />
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.estimatedPostProcessingTime"
            defaultMessage="Estimated Post Processing Time"
          />
        </Label>
        <br />
        {postProcessing ? (
          <FormattedDuration seconds={postProcessing} />
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.estimatedMaterialUsed"
            defaultMessage="Estimated Material Used"
          />
        </Label>
        <br />
        {base ? (
          <FormattedVolume value={base} />
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.estimatedSupportUsed"
            defaultMessage="Estimated Support Used"
          />
        </Label>
        <br />
        {support ? (
          <FormattedVolume value={support} />
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
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
  if (!run ||!run.estimates) return {};
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
