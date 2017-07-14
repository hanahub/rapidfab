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
  "processing": <FormattedMessage id="status.processing" defaultMessage="Processing"/>,
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
  "error": <FormattedMessage id="status.error" defaultMessage="Error"/>,
}

export const ORDER_REGION_MAPPING = {
  "north": <FormattedMessage id="order.north" defaultMessage="North"/>,
  "east": <FormattedMessage id="order.east" defaultMessage="East"/>,
  "south": <FormattedMessage id="order.south" defaultMessage="South"/>,
  "west": <FormattedMessage id="order.west" defaultMessage="West"/>,
};

export const ORDER_SALES_MAPPING = {
  "won": <FormattedMessage id="order.won" defaultMessage="Won"/>,
  "lost": <FormattedMessage id="order.lost" defaultMessage="Lost"/>,
  "outsourced": <FormattedMessage id="order.outsourced" defaultMessage="Outsourced"/>,
  "dead": <FormattedMessage id="order.dead" defaultMessage="Dead"/>,
  "pending": <FormattedMessage id="order.pending" defaultMessage="Pending"/>,
};

export const ORDER_TYPE_MAPPING = {
  "standard": <FormattedMessage id="order.standard" defaultMessage="Standard"/>,
  "benchmark": <FormattedMessage id="order.benchmark" defaultMessage="Benchmark"/>,
  "timestudy": <FormattedMessage id="order.timestudy" defaultMessage="Timestudy"/>,
};

