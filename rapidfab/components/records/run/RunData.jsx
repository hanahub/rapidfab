import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Panel, Table } from 'react-bootstrap';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import {
  FormattedDuration,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

const RunData = ({ actuals, estimates, operation }) => (
  <Panel>
    <Table bordered condensed fill>
      <thead>
        <tr>
          <th />
          <th>
            <FormattedMessage id="estimates" defaultMessage="Estimates" />
          </th>
          <th>
            <FormattedMessage id="actuals" defaultMessage="Actuals" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>
              <FormattedMessage id="start" defaultMessage="Start" />
            </strong>
          </td>
          <td>
            {estimates.start && (
              <span>
                {Moment(estimates.start).format('MMMM DD YYYY, h:mm:ss a')}
              </span>
            )}
          </td>
          <td>
            {actuals.start && (
              <span>
                {Moment(actuals.start).format('MMMM DD YYYY, h:mm:ss a')}
              </span>
            )}
          </td>
        </tr>
        <tr>
          <td>
            <strong>
              <FormattedMessage id="end" defaultMessage="End" />
            </strong>
          </td>
          <td>
            {estimates.end && (
              <span>
                {Moment(estimates.end).format('MMMM DD YYYY, h:mm:ss a')}
              </span>
            )}
          </td>
          <td>
            {actuals.end && (
              <span>
                {Moment(actuals.end).format('MMMM DD YYYY, h:mm:ss a')}
              </span>
            )}
          </td>
        </tr>
        {operation === 'printing' && (
          <tr>
            <td>
              <strong>
                <FormattedMessage id="printTime" defaultMessage="Print Time" />
              </strong>
            </td>
            <td>
              {estimates.print && <FormattedDuration value={estimates.print} />}
            </td>
            <td>
              {actuals.print && <FormattedDuration value={actuals.print} />}
            </td>
          </tr>
        )}
        {operation === 'post-processing' && (
          <tr>
            <td>
              <strong>
                <FormattedMessage
                  id="postProcessingTime"
                  defaultMessage="Post-Processing Time"
                />
              </strong>
            </td>
            <td>
              {estimates.postProcessing && (
                <FormattedDuration value={estimates.postProcessing} />
              )}
            </td>
            <td>
              {actuals.postProcessing && (
                <FormattedDuration value={actuals.postProcessing} />
              )}
            </td>
          </tr>
        )}
        {operation === 'shipping' && (
          <tr>
            <td>
              <strong>
                <FormattedMessage
                  id="shippingTime"
                  defaultMessage="Shipping Time"
                />
              </strong>
            </td>
            <td>
              {estimates.shipping && (
                <FormattedDuration value={estimates.shipping} />
              )}
            </td>
            <td>
              {actuals.shipping && (
                <FormattedDuration value={actuals.shipping} />
              )}
            </td>
          </tr>
        )}
        {operation === 'printing' && (
          <tr>
            <td>
              <strong>
                <FormattedMessage
                  id="materialUsed"
                  defaultMessage="Material Used"
                />
              </strong>
            </td>
            <td>
              {estimates.base && <FormattedVolume value={estimates.base} />}
            </td>
            <td>
              {actuals.base && <FormattedVolume value={estimates.base} />}
            </td>
          </tr>
        )}
        {operation === 'printing' && (
          <tr>
            <td>
              <strong>
                <FormattedMessage
                  id="supportUsed"
                  defaultMessage="Support Used"
                />
              </strong>
            </td>
            <td>
              {estimates.support && (
                <FormattedVolume value={estimates.support} />
              )}
            </td>
            <td>
              {actuals.support && <FormattedVolume value={estimates.support} />}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </Panel>
);

RunData.defaultProps = {
  actuals: {
    base: null,
    end: null,
    postProcessing: null,
    print: null,
    start: null,
    support: null,
  },
  estimates: {
    base: null,
    end: null,
    postProcessing: null,
    print: null,
    start: null,
    support: null,
  },
  operation: null,
};

RunData.propTypes = {
  actuals: PropTypes.shape({
    base: PropTypes.number,
    end: PropTypes.string,
    postProcessing: PropTypes.number,
    print: PropTypes.number,
    start: PropTypes.string,
    shipping: PropTypes.number,
    support: PropTypes.number,
  }),
  estimates: PropTypes.shape({
    base: PropTypes.number,
    end: PropTypes.string,
    postProcessing: PropTypes.number,
    print: PropTypes.number,
    start: PropTypes.string,
    shipping: PropTypes.number,
    support: PropTypes.number,
  }),
  operation: PropTypes.string,
};

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  if (!run || !run.actuals || !run.estimates) return {};
  return {
    actuals: {
      base: run.actuals.materials.base,
      end: run.actuals.end,
      postProcessing: run.actuals.time.post_processing,
      print: run.actuals.time.print,
      start: run.actuals.start,
      shipping: run.actuals.time.shipping,
      support: run.actuals.materials.support,
    },
    estimates: {
      base: run.estimates.materials.base,
      end: run.estimates.end,
      postProcessing: run.estimates.time.post_processing,
      print: run.estimates.time.print,
      start: run.estimates.start,
      shipping: run.estimates.time.shipping,
      support: run.estimates.materials.support,
    },
    operation: run.operation,
  };
};

export default connect(mapStateToProps)(RunData);
