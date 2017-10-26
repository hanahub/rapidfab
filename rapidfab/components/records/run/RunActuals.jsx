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

const RunActuals = ({ base, end, postProcessing, print, start, support }) => (
  <Panel bsStyle="success">
    <ListGroup fill>
      <ListGroupItem header="Actuals" />

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.actualStartTime"
            defaultMessage="Actual Start Time"
          />
        </Label>
        <br />
        {start ? (
          <span>
            {Moment(start).format('MMMM DD YYYY, h:mm:ss a')}
            <br />
            ({Moment(start).fromNow()})
          </span>
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.actualEndTime"
            defaultMessage="Actual End Time"
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
            id="field.actualPrintTime"
            defaultMessage="Actual Print Time"
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
            id="field.actualPostProcessingTime"
            defaultMessage="Actual Post Processing Time"
          />
        </Label>
        <br />
        {postProcessing ? (
          <FormattedDuration value={postProcessing} />
        ) : (
          <FormattedMessage id="notAvailable" defaultMessage="N/A" />
        )}
      </ListGroupItem>

      <ListGroupItem>
        <Label>
          <FormattedMessage
            id="field.actualMaterialUsed"
            defaultMessage="Actual Material Used"
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
            id="field.actualSupportUsed"
            defaultMessage="Actual Support Used"
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
