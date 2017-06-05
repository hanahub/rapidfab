import React from 'react'
import { FormattedMessage } from 'rapidfab/i18n'

export const ORDER_STATUS_MAP = {
  "calculating_estimates": <FormattedMessage id="status.calculatingEstimates" defaultMessage="Calculating Estimates"/>,
  "cancelled": <FormattedMessage id="status.cancelled" defaultMessage="Cancelled"/>,
  "confirmed": <FormattedMessage id="status.confirmed" defaultMessage="Confirmed"/>,
  "complete": <FormattedMessage id="status.complete" defaultMessage="Complete"/>,
  "error": <FormattedMessage id="status.error" defaultMessage="Error"/>,
  "new": <FormattedMessage id="status.new" defaultMessage="New"/>,
  "pending": <FormattedMessage id="status.pending" defaultMessage="Pending"/>,
  "post-processing": <FormattedMessage id="status.postProcessing" defaultMessage="Post Processing"/>,
  "printed": <FormattedMessage id="status.printed" defaultMessage="Printed"/>,
  "printing": <FormattedMessage id="status.printing" defaultMessage="Printing"/>,
  "shipping": <FormattedMessage id="status.shipping" defaultMessage="Shipping"/>,
}

export const RUN_STATUS_MAP = {
  "calculating": <FormattedMessage id="status.calculating" defaultMessage="Calculating"/>,
  "calculated": <FormattedMessage id="status.calculated" defaultMessage="Calculated"/>,
  "complete": <FormattedMessage id="status.complete" defaultMessage="Complete"/>,
  "created": <FormattedMessage id="status.created" defaultMessage="Created"/>,
  "error": <FormattedMessage id="status.error" defaultMessage="Error"/>,
  "in-progress": <FormattedMessage id="status.inProgress" defaultMessage="In Progress"/>,
  "queued": <FormattedMessage id="status.queued" defaultMessage="Queued"/>,
}
